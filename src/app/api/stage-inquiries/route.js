import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StageInquiry from '@/models/StageInquiry';
import { sendStageInquiryEmail } from '@/lib/brevo';

export async function GET() {
    try {
        await connectDB();
        const inquiries = await StageInquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: inquiries });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        
        const inquiry = await StageInquiry.create(body);

        sendStageInquiryEmail({
            name: body.name,
            email: body.email,
            phone: body.phone,
            formationTitle: body.formationTitle,
            formationNumber: body.formationNumber
        }).catch(err => console.error('Brevo email error (stage-inquiry):', err));

        return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { id, isRead } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID est requis' },
                { status: 400 }
            );
        }

        const inquiry = await StageInquiry.findByIdAndUpdate(
            id,
            { isRead },
            { new: true, runValidators: true }
        );

        if (!inquiry) {
            return NextResponse.json(
                { success: false, error: 'Solicitude non trouvée' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: inquiry });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
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
                { success: false, error: 'ID est requis' },
                { status: 400 }
            );
        }

        const deletedInquiry = await StageInquiry.findByIdAndDelete(id);

        if (!deletedInquiry) {
            return NextResponse.json(
                { success: false, error: 'Solicitude non trouvée' },
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
