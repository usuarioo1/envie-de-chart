import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// GET - Obtener todos los items
export async function GET(request) {
    try {
        const { response } = await requireAdmin(request);
        if (response) return response;

        await connectDB();
        const items = await Item.find({});

        return NextResponse.json({
            success: true,
            data: items
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });
    }
}

// POST - Crear un nuevo item
export async function POST(request) {
    try {
        const { response } = await requireAdmin(request);
        if (response) return response;

        await connectDB();
        const body = await request.json();

        const item = await Item.create(body);

        return NextResponse.json({
            success: true,
            data: item
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });
    }
}
