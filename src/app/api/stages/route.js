import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Stage from '@/models/Stage';
import { getAdminUserFromRequest, requireAdmin } from '@/lib/auth';

const PUBLIC_CACHE_HEADERS = {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
};

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const status = searchParams.get('status');
        const admin = await getAdminUserFromRequest(request);

        if (id) {
            const stage = await Stage.findOne({
                _id: id,
                ...(admin ? {} : { status: 'published' })
            }).lean();
            if (!stage) {
                return NextResponse.json(
                    { success: false, error: 'Stage non trouvé' },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { success: true, data: stage },
                { headers: PUBLIC_CACHE_HEADERS }
            );
        }

        let query = admin ? {} : { status: 'published' };
        if (admin && status) {
            query.status = status;
        }

        const stages = await Stage.find(query)
            .sort({ date: 1, createdAt: -1 })
            .lean();
        return NextResponse.json(
            { success: true, data: stages },
            { headers: PUBLIC_CACHE_HEADERS }
        );
    } catch (error) {
        console.error('Error fetching stages:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { response } = await requireAdmin(request);
        if (response) return response;

        await connectDB();
        const body = await request.json();
        const { title, date, location, description, contact, email, phone, formatrice, country } = body;

        if (!title || !date || !location || !description || !email || !phone) {
            return NextResponse.json(
                { success: false, error: 'Tous les champs obligatoires doivent être remplis' },
                { status: 400 }
            );
        }

        const stage = await Stage.create({
            title,
            date,
            location,
            description,
            contact,
            email,
            phone,
            formatrice,
            country,
            status: 'published'
        });

        return NextResponse.json(
            { success: true, data: stage, message: 'Stage créé avec succès!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating stage:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur lors de la création' },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { response } = await requireAdmin(request);
        if (response) return response;

        await connectDB();
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID requis' },
                { status: 400 }
            );
        }

        const stage = await Stage.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!stage) {
            return NextResponse.json(
                { success: false, error: 'Stage non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: stage });
    } catch (error) {
        console.error('Error updating stage:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { response } = await requireAdmin(request);
        if (response) return response;

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID requis' },
                { status: 400 }
            );
        }

        const stage = await Stage.findByIdAndDelete(id);

        if (!stage) {
            return NextResponse.json(
                { success: false, error: 'Stage non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Stage supprimé avec succès'
        });
    } catch (error) {
        console.error('Error deleting stage:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        );
    }
}
