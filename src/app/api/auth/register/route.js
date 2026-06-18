import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { requireAdmin } from '@/lib/auth';

export async function POST(req) {
  try {
    const { response } = await requireAdmin(req);
    if (response) return response;

    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user' // Default role
    });

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
