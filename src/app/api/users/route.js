import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

// GET all users
export async function GET(request) {
  try {
    const { response } = await requireAdmin(request);
    if (response) return response;

    await connectDB();
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT update user role (admin only)
export async function PUT(req) {
  try {
    const { user: currentUser, response } = await requireAdmin(req);
    if (response) return response;

    await connectDB();
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, error: 'Please provide userId and role' },
        { status: 400 }
      );
    }

    if (!['user', 'admin'].includes(role)) {
      return NextResponse.json(
        { success: false, error: 'Invalid role. Must be user or admin' },
        { status: 400 }
      );
    }

    if (currentUser.id === userId && role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'You cannot remove your own admin role' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE user
export async function DELETE(req) {
  try {
    const { user: currentUser, response } = await requireAdmin(req);
    if (response) return response;

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Please provide user ID' },
        { status: 400 }
      );
    }

    if (currentUser.id === id) {
      return NextResponse.json(
        { success: false, error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
