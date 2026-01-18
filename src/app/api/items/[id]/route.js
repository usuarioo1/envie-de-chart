import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

// GET - Obtener un item por ID
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const item = await Item.findById(id);

        if (!item) {
            return NextResponse.json({
                success: false,
                error: 'Item no encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: item
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });
    }
}

// PUT - Actualizar un item por ID
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const body = await request.json();

        const item = await Item.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!item) {
            return NextResponse.json({
                success: false,
                error: 'Item no encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: item
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });
    }
}

// DELETE - Eliminar un item por ID
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return NextResponse.json({
                success: false,
                error: 'Item no encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {}
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });
    }
}
