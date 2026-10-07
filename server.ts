import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Persistent orders storage in local data directory
  const DATA_DIR = path.resolve(process.cwd(), 'data');
  const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
  const USERS_FILE = path.join(DATA_DIR, 'users.json');
  
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Pre-populate with default user '정현정'
  if (!fs.existsSync(USERS_FILE)) {
    const initialUsers = [
      {
        id: 'user-1',
        name: '정현정',
        email: 'hyunjung@example.com',
        password: 'password123',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
  }

  // Pre-populate with 1 realistic initial order for demo if empty so admin can immediately test
  if (!fs.existsSync(ORDERS_FILE)) {
    const initialOrders = [
      {
        orderNumber: 'HS-20261006-7241',
        bundle: {
          id: 'bundle-2',
          name: '2박스 (60포 / 2개월분)',
          count: 2,
          price: 85000,
          originalPrice: 116000
        },
        buyerName: '김민준',
        phone: '010-3849-1928',
        address: '경기도 성남시 분당구 판교역로 146',
        detailAddress: '힐스테이트 102동 1504호',
        requestNote: '문 앞에 두고 벨 눌러주세요',
        paymentMethod: '신용/체크카드',
        totalPrice: 85000,
        status: '배송준비',
        carrier: '우체국택배',
        trackingNumber: '6892-1049-3911',
        createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
        formattedDate: new Date(Date.now() - 3600 * 1000 * 4).toLocaleString('ko-KR')
      }
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), 'utf-8');
  }

  const readOrders = () => {
    try {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading orders file:', err);
      return [];
    }
  };

  const writeOrders = (orders: any[]) => {
    try {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing orders file:', err);
    }
  };

  const readUsers = () => {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading users file:', err);
      return [];
    }
  };

  const writeUsers = (users: any[]) => {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing users file:', err);
    }
  };

  // SSE clients list for real-time live notifications
  const sseClients: express.Response[] = [];

  const notifyOrderUpdate = (event: { type: string; order?: any; orderNumber?: string }) => {
    const payload = `data: ${JSON.stringify(event)}\n\n`;
    for (let i = sseClients.length - 1; i >= 0; i--) {
      try {
        sseClients[i].write(payload);
      } catch (e) {
        sseClients.splice(i, 1);
      }
    }
  };

  // --- API Endpoints ---
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // Real-time SSE stream for orders
  app.get('/api/orders/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    sseClients.push(res);
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

    req.on('close', () => {
      const idx = sseClients.indexOf(res);
      if (idx !== -1) sseClients.splice(idx, 1);
    });
  });

  // --- Authentication Endpoints ---
  // 1. 회원가입 (Signup)
  app.post('/api/auth/signup', (req, res) => {
    const { email, password, name } = req.body;

    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedName = (name || '').trim();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail) {
      return res.status(400).json({ error: '이메일 주소를 입력해 주세요.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: '올바른 이메일 주소 형식으로 입력해 주세요. (예: user@example.com)' });
    }

    if (!trimmedName) {
      return res.status(400).json({ error: '이름(성함)을 입력해 주세요.' });
    }

    if (!trimmedPassword || trimmedPassword.length < 6) {
      return res.status(400).json({ error: '비밀번호가 너무 짧아요. 최소 6자 이상 입력해 주세요.' });
    }

    const users = readUsers();
    const existingUser = users.find((u: any) => u.email === trimmedEmail);
    if (existingUser) {
      return res.status(400).json({ error: '이미 가입된 이메일 주소입니다. 로그인해 주세요.' });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    console.log(`[USER SIGNUP] ${newUser.name} (${newUser.email})`);
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  });

  // 2. 로그인 (Login)
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail) {
      return res.status(400).json({ error: '이메일 주소를 입력해 주세요.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: '올바른 이메일 주소 형식으로 입력해 주세요. (예: user@example.com)' });
    }

    if (!trimmedPassword || trimmedPassword.length < 6) {
      return res.status(400).json({ error: '비밀번호가 너무 짧아요. 최소 6자 이상 입력해 주세요.' });
    }

    const users = readUsers();
    const user = users.find((u: any) => u.email === trimmedEmail);

    if (!user) {
      return res.status(400).json({ error: '가입되지 않은 이메일 주소입니다. 이메일을 다시 확인하시거나 회원가입을 먼저 진행해 주세요.' });
    }

    if (user.password !== trimmedPassword) {
      return res.status(400).json({ error: '비밀번호가 올바르지 않습니다. 다시 한 번 확인해 주세요.' });
    }

    console.log(`[USER LOGIN] ${user.name} (${user.email})`);
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });

  // 1. Get orders (with optional phone search filter)
  app.get('/api/orders', (req, res) => {
    const orders = readOrders();
    const phone = req.query.phone as string;
    const query = req.query.q as string;

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const filtered = orders.filter((o: any) => o.phone.replace(/\D/g, '').includes(cleanPhone));
      return res.json(filtered);
    }

    if (query) {
      const cleanQuery = query.toLowerCase().trim();
      const filtered = orders.filter((o: any) =>
        o.orderNumber.toLowerCase().includes(cleanQuery) ||
        o.buyerName.toLowerCase().includes(cleanQuery) ||
        o.phone.includes(cleanQuery) ||
        o.address.toLowerCase().includes(cleanQuery)
      );
      return res.json(filtered);
    }

    res.json(orders);
  });

  // 2. Get single order by orderNumber
  app.get('/api/orders/:orderNumber', (req, res) => {
    const orders = readOrders();
    const order = orders.find((o: any) => o.orderNumber === req.params.orderNumber);
    if (!order) {
      return res.status(404).json({ error: '해당 주문 번호를 찾을 수 없습니다.' });
    }
    res.json(order);
  });

  // 3. Create real order
  app.post('/api/orders', (req, res) => {
    const { bundle, buyerName, phone, address, detailAddress, requestNote, paymentMethod, totalPrice } = req.body;

    if (!buyerName || !buyerName.trim()) {
      return res.status(400).json({ error: '받는 분 성함을 입력해 주세요.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: '연락처를 입력해 주세요.' });
    }
    if (!address || !address.trim()) {
      return res.status(400).json({ error: '배송지 주소를 입력해 주세요.' });
    }

    const orders = readOrders();
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const randPart = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randPart}`;

    const newOrder = {
      orderNumber,
      bundle: bundle || {
        id: 'bundle-1',
        name: '1박스 (30포 / 1개월분)',
        count: 1,
        price: 45000,
        originalPrice: 58000
      },
      buyerName: buyerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      detailAddress: (detailAddress || '').trim(),
      requestNote: requestNote || '문 앞에 두고 벨 눌러주세요',
      paymentMethod: paymentMethod || '신용/체크카드',
      totalPrice: Number(totalPrice) || 45000,
      status: '주문접수', // 주문접수 | 결제확인 | 배송준비 | 배송중 | 배송완료 | 주문취소
      carrier: '우체국택배',
      trackingNumber: '',
      createdAt: now.toISOString(),
      formattedDate: now.toLocaleString('ko-KR')
    };

    orders.unshift(newOrder);
    writeOrders(orders);
    notifyOrderUpdate({ type: 'new_order', order: newOrder });

    console.log(`[REAL ORDER CREATED] ${newOrder.orderNumber} - ${newOrder.buyerName} - ${newOrder.totalPrice.toLocaleString()}원`);
    res.status(201).json(newOrder);
  });

  // 4. Update order status or tracking number
  app.patch('/api/orders/:orderNumber/status', (req, res) => {
    const { status, trackingNumber, carrier } = req.body;
    const orders = readOrders();
    const index = orders.findIndex((o: any) => o.orderNumber === req.params.orderNumber);

    if (index === -1) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }

    if (status) orders[index].status = status;
    if (trackingNumber !== undefined) orders[index].trackingNumber = trackingNumber;
    if (carrier) orders[index].carrier = carrier;
    orders[index].updatedAt = new Date().toISOString();

    writeOrders(orders);
    notifyOrderUpdate({ type: 'order_updated', order: orders[index] });
    res.json(orders[index]);
  });

  // 5. Cancel / Delete order
  app.delete('/api/orders/:orderNumber', (req, res) => {
    const orders = readOrders();
    const filtered = orders.filter((o: any) => o.orderNumber !== req.params.orderNumber);

    if (filtered.length === orders.length) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }

    writeOrders(filtered);
    notifyOrderUpdate({ type: 'order_deleted', orderNumber: req.params.orderNumber });
    res.json({ success: true, message: '주문이 취소/삭제되었습니다.' });
  });

  // Setup Vite middlewares for SSR/dev SPA or static for production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FULL-STACK APP] Server ready on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
