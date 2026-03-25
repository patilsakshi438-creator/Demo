const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  validateRegisterPayload,
  validateLoginPayload,
} = require('../utils/authValidation');

const router = express.Router();

router.post('/register', async (req, res) => {
  const validation = validateRegisterPayload(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    const { name, email, password } = validation.values;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'Registration successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while registering user.' });
  }
});

router.post('/login', async (req, res) => {
  const validation = validateLoginPayload(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret is not configured on the server.' });
  }

  try {
    const { email, password } = validation.values;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while logging in.' });
  }
});

module.exports = router;
