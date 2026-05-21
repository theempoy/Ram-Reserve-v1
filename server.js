const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory database (replace with MongoDB/PostgreSQL in production)
let tickets = [
  {
    id: "TICKET-DEMO-001",
    department: "IT",
    itemType: "camera",
    requestedBy: "John Doe",
    email: "john.doe@example.com",
    date: "2026-05-20",
    time: "10:00",
    duration: "2-hours",
    purpose: "Photography session for campus event",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "TICKET-DEMO-002",
    department: "BMO",
    itemType: "room-204",
    requestedBy: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2026-05-21",
    time: "14:00",
    duration: "3-hours",
    purpose: "Team meeting and presentation rehearsal",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const users = {
  admin: { 
    email: "admin@ramreserve.com", 
    password: "admin123", 
    role: "admin", 
    name: "Admin User" 
  },
  user: { 
    email: "user@ramreserve.com", 
    password: "user123", 
    role: "user", 
    name: "John Doe" 
  }
};

// API Routes

// Authentication
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = Object.values(users).find(
    u => u.email === email && u.password === password && u.role === role
  );

  if (user) {
    res.json({
      success: true,
      user: {
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

// Get all tickets
app.get('/api/tickets', (req, res) => {
  res.json({ tickets });
});

// Create a new ticket
app.post('/api/tickets', (req, res) => {
  const { department, itemType, requestedBy, email, date, time, duration, purpose } = req.body;

  if (!department || !itemType || !requestedBy || !email || !date || !time || !duration || !purpose) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newTicket = {
    id: ticketId,
    department,
    itemType,
    requestedBy,
    email,
    date,
    time,
    duration,
    purpose,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  tickets.unshift(newTicket);
  res.status(201).json({ ticket: newTicket });
});

// Update ticket status
app.put('/api/tickets/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const ticketIndex = tickets.findIndex(t => t.id === id);
  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  tickets[ticketIndex].status = status;
  res.json({ ticket: tickets[ticketIndex] });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Ramreserve server running on http://localhost:${PORT}`);
  console.log(`📝 Login as user: user@ramreserve.com / user123`);
  console.log(`🔐 Login as admin: admin@ramreserve.com / admin123`);
});