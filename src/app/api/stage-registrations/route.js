import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StageRegistration from '@/models/StageRegistration';
import Stage from '@/models/Stage';

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const stageId = searchParams.get('stageId');
        const id = searchParams.get('id');

        if (id) {
            const registration = await StageRegistration.findById(id);
            if (!registration) {
                return NextResponse.json(
                    { success: false, error: 'Inscription non trouvée' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, data: registration });
        }

        if (stageId) {
            const registrations = await StageRegistration.find({ stageId })
                .sort({ createdAt: -1 });
            return NextResponse.json({ success: true, data: registrations });
        }

        const registrations = await StageRegistration.find()
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: registrations });
    } catch (error) {
        console.error('Error fetching stage registrations:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { stageId, name, email, phone, source } = body;

        if (!stageId || !name || !email || !phone) {
            return NextResponse.json(
                { success: false, error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Verify stage exists
        const stage = await Stage.findById(stageId);
        if (!stage) {
            return NextResponse.json(
                { success: false, error: 'Stage non trouvé' },
                { status: 404 }
            );
        }

        // Check if already registered
        const existingRegistration = await StageRegistration.findOne({
            stageId,
            email: email.toLowerCase()
        });

        if (existingRegistration) {
            return NextResponse.json(
                { success: false, error: 'Vous êtes déjà inscrit à ce stage' },
                { status: 400 }
            );
        }

        // Create registration
        const registration = await StageRegistration.create({
            stageId,
            stageTitle: stage.title,
            stageDate: stage.date,
            name,
            email,
            phone,
            source: source || 'calendar',
            status: 'pending'
        });

        return NextResponse.json(
            { success: true, data: registration, message: 'Inscription réussie!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating stage registration:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur lors de l\'inscription' },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { success: false, error: 'ID et statut requis' },
                { status: 400 }
            );
        }

        const registration = await StageRegistration.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!registration) {
            return NextResponse.json(
                { success: false, error: 'Inscription non trouvée' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: registration });
    } catch (error) {
        console.error('Error updating stage registration:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
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
                { success: false, error: 'ID requis' },
                { status: 400 }
            );
        }

        const registration = await StageRegistration.findByIdAndDelete(id);

        if (!registration) {
            return NextResponse.json(
                { success: false, error: 'Inscription non trouvée' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Inscription supprimée avec succès'
        });
    } catch (error) {
        console.error('Error deleting stage registration:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        );
    }
}
