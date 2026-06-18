import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import { requireAdmin } from '@/lib/auth';

// GET all events
export async function GET(request) {
  try {
    const { response } = await requireAdmin(request);
    if (response) return response;

    await connectDB();
    const events = await Event.find({}).populate('createdBy', 'name email').sort({ date: 1 });
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// POST create new event
export async function POST(req) {
  try {
    const { user, response } = await requireAdmin(req);
    if (response) return response;

    await connectDB();
    const body = await req.json();
    const { title, description, price, location, date } = body;

    if (!title || !description || price === undefined || !location || !date) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title,
      description,
      price,
      location,
      date,
      createdBy: user.id
    });

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE an event
export async function DELETE(req) {
  try {
    const { response } = await requireAdmin(req);
    if (response) return response;

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Please provide event ID' },
        { status: 400 }
      );
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
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
