
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const serverRoutes = require('./routes/servers');
const paymentRoutes = require('./routes/payments');
const rewardRoutes = require('./routes/rewards');
const adminRoutes = require('./routes/admin');
const oneConnectRoutes = require('./routes/oneconnect');
const adRoutes = require('./routes/ads');
const notificationRoutes = require('./routes/notifications');
const supportRoutes = require('./routes/support');
const blogRoutes = require('./routes/blog');
const leaderboardRoutes = require('./routes/leaderboard');

const db = require('./models');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/servers', serverRoutes);
app.use('/api/v1/subscription', paymentRoutes);
app.use('/api/v1/rewards', rewardRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/oneconnect', oneConnectRoutes);
app.use('/api/v1/ads', adRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/support', supportRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database sync and server start
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  logger.error('Unable to connect to the database:', err);
});

module.exports = app;
