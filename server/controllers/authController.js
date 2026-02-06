import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

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
        // Send welcome email
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Welcome to Our App!',
          text: `Hi ${name},\n\nThank you for registering at our app! We're excited to have you on board.\n\nBest regards,\nThe Team`
        };
        await transporter.sendMail(mailOptions);
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
//send OTP to user email for verification
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (user.isVerified) {
      return res.json({ success: false, message: 'User already verified' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Your OTP for Email Verification',
      text: `Hi ${user.name},\n\nYour OTP for email verification is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nBest regards,\nThe Team`
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'OTP sent to email' });
  }
  catch(err){
    return res.json({ success: false, message: 'Error sending OTP' });
  }
}

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.json({ success: false, message: 'All fields are required' });
    }
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }
      if (user.verifyOtp==='' || user.verifyOtp !== otp) {
        return res.json({ success: false, message: 'Invalid OTP' });
      }
      if (user.verifyOtpExpireAt < Date.now()) {
        return res.json({ success: false, message: 'OTP expired' });
      }
      user.isAccountVerified = true;
      user.verifyOtp = '';
      user.verifyOtpExpireAt = null;
      await user.save();
      return res.json({ success: true, message: 'Email verified successfully' });
    }
    catch (err) {
      return res.json({ success: false, message: 'Server error' });
    }
}
