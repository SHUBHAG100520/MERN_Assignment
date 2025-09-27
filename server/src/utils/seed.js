import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

await connectDB(process.env.MONGO_URI);

const adminEmail = 'admin@example.com';
const exists = await User.findOne({ email: adminEmail });
if (!exists) {
  await User.create({ name: 'Admin', email: adminEmail, password: 'admin123', role: 'admin' });
  console.log('Admin created -> admin@example.com / admin123');
} else {
  console.log('Admin already exists');
}
await mongoose.disconnect();
