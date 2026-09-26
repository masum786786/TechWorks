import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent inquiries file path
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data folder and file exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SEED_INQUIRIES = [
  {
    id: 'inq-101',
    name: 'Sameer Verma',
    email: 'sameer.v@zenithlogistics.in',
    phone: '+91 98112 45890',
    service: 'Android App Development',
    description: 'Looking to build an Android logistics dispatch driver app with offline map routing, electronic signature capture, and UPI payment integration.',
    status: 'new',
    admin_notes: 'Priority lead. Sent WhatsApp introductory message.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    budget_range: '₹2,50,000 - ₹5,00,000',
  },
  {
    id: 'inq-102',
    name: 'Ananya Deshmukh',
    email: 'ananya@orthocare.clinic',
    phone: '+91 97234 11200',
    service: 'Custom Software Development',
    description: 'Need an online clinic OPD management and patient history portal similar to your dental clinic project.',
    status: 'contacted',
    admin_notes: 'Demo call scheduled for tomorrow 3 PM IST.',
    created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    budget_range: '₹1,50,000 - ₹3,00,000',
  },
  {
    id: 'inq-103',
    name: 'Karan Mehra',
    email: 'karan@growthfuel.co',
    phone: '+91 99551 88321',
    service: 'LLMs & Generative AI Systems',
    description: 'We want to integrate an autonomous customer support AI agent fine-tuned on our e-commerce product return policy.',
    status: 'in_progress',
    admin_notes: 'Sent proposal and architecture diagram.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    budget_range: '₹4,00,000+',
  },
];

function readInquiries(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_INQUIRIES, null, 2), 'utf-8');
      return SEED_INQUIRIES;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return SEED_INQUIRIES;
  }
}

function writeInquiries(data: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing inquiries:', err);
  }
}

// Ensure initial seed
readInquiries();

// API Routes
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Specific user credential requirement: username and password both admin@123
  if (username === 'admin@123' && password === 'admin@123') {
    return res.json({
      success: true,
      token: 'techworks_adm_token_' + Date.now(),
      user: { username: 'admin@123', role: 'SuperAdmin' },
    });
  }
  return res.status(401).json({ success: false, error: 'Invalid credentials. Please use admin@123 / admin@123' });
});

app.get('/api/inquiries', (req, res) => {
  const inquiries = readInquiries();
  // Return newest first
  inquiries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json({ success: true, inquiries });
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, service, description, budget_range } = req.body;

  if (!name || !email || !phone || !description) {
    return res.status(400).json({ success: false, error: 'Name, email, phone, and description are required.' });
  }

  const inquiries = readInquiries();
  const newInquiry = {
    id: req.body.id || 'inq-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    service: service || 'Custom Software Development',
    description: description.trim(),
    status: req.body.status || 'new',
    admin_notes: req.body.admin_notes || '',
    budget_range: budget_range || 'Flexible',
    created_at: req.body.created_at || new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  writeInquiries(inquiries);

  console.log(`[TechWorks] New consultation request received from ${name} (${email}, ${phone})`);
  res.status(201).json({ success: true, inquiry: newInquiry });
});

app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const inquiries = readInquiries();

  const index = inquiries.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  }

  inquiries[index] = {
    ...inquiries[index],
    ...updates,
  };

  writeInquiries(inquiries);
  res.json({ success: true, inquiry: inquiries[index] });
});

app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const inquiries = readInquiries();
  const filtered = inquiries.filter((item) => item.id !== id);
  writeInquiries(filtered);
  res.json({ success: true, message: 'Inquiry deleted' });
});

app.get('/api/supabase/status', (req, res) => {
  const hasEnv = Boolean(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY);
  res.json({
    configured: hasEnv,
    supabaseUrl: process.env.VITE_SUPABASE_URL ? 'Configured via Environment' : 'Not configured',
  });
});

async function startServer() {
  if (!isProduction) {
    // Vite middleware for development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TechWorks server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
