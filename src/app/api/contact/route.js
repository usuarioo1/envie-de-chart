import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, subject, message, interest } = await request.json();

        // Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create contact message
        const contactMessage = await ContactMessage.create({
            name,
            email,
            subject,
            interest: interest || '',
            message
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Contact message sent successfully',
                data: contactMessage
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving contact message:', error);
        return NextResponse.json(
            { error: error.message || 'Error saving contact message' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const messages = await ContactMessage.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                data: messages
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json(
            { error: error.message || 'Error fetching messages' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Message ID is required' },
                { status: 400 }
            );
        }

        const result = await ContactMessage.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Message deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting contact message:', error);
        return NextResponse.json(
            { error: error.message || 'Error deleting message' },
            { status: 500 }
        );
    }
}
