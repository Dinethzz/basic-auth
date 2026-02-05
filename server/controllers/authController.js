import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'All fields are required' });
    }
    try{
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '4d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        } )
        return res.json({ success: true, message: 'User registered successfully' });                        
    }
    catch(err){
      console.error('Registration error:', err);
      return res.json({ success: false, message: 'Error during registration' });
    }
  } catch (err) {
    return res.json({ success: false, message: 'Server error' });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: 'All fields are required' });
    }
    try{
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.json({ success: false, message: 'Invalid credentials' });
        } 
        const isMatched = await bcryptjs.compare(password, user.password);
        if (!isMatched) {
          return res.json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        } )
        return res.json({ success: true, message: 'Login successful' });    
    }
    catch(err){
      return res.json({ success: false, message: 'Error during login' });
    }
  } catch (err) {
    return res.json({ success: false, message: 'Server error' });
  }
}

export const logout = async (req, res) => {
  try{
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    return res.json({ success: true, message: 'Logout successful' });
  }
  catch(err){
    return res.json({ success: false, message: 'Error during logout' });
  }
}
