import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { setSessionCookie } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const passwordIsHashed = user.password.startsWith('$2');
    const passwordMatches = passwordIsHashed
      ? await bcrypt.compare(password, user.password)
      : user.password === password;

    if (!passwordMatches) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Administrator access required' },
        { status: 403 }
      );
    }

    if (!passwordIsHashed) {
      user.password = await bcrypt.hash(password, 12);
      await user.save();
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const response = NextResponse.json({ success: true, user: userData });
    setSessionCookie(response, user);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
