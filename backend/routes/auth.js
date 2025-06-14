
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User, Admin } = require('../models');
const router = express.Router();

// User Registration
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password, phone, referralCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate referral code
    const userReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      phone,
      referral_code: userReferralCode
    };

    // Handle referral
    if (referralCode) {
      const referrer = await User.findOne({ where: { referral_code: referralCode } });
      if (referrer) {
        userData.referred_by = referrer.id;
        // Add bonus points to referrer
        await referrer.increment('points', { by: 500 });
      }
    }

    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        points: user.points,
        referral_code: user.referral_code
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// User Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({
        success: false,
        message: 'Account has been blocked'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last seen
    await user.update({ last_seen: new Date() });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        points: user.points,
        subscription_expires: user.subscription_expires
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Admin Login
router.post('/admin/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const { email, password } = req.body;

    // For demo purposes, using hardcoded admin credentials
    // In production, store in database with proper hashing
    if (email === 'admin@luckyvpn.com' && password === 'admin123') {
      const token = jwt.sign({ 
        id: 1, 
        role: 'admin' 
      }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          id: 1,
          email: 'admin@luckyvpn.com',
          role: 'admin'
        },
        token
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
