import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoint for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API Endpoint to register a new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API Endpoint to add data to a specific account
app.post('/api/addData', async (req, res) => {
    const { email, data } = req.body;
    console.log(email,data);
  
    try {
      // Find the account by email and password
      const account = await User.findOne({email});
  
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      // Add the new data to the existing data array
      account.data.push(data);
  
      // Save the updated account
      const updatedAccount = await account.save();
  
      res.json(updatedAccount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});