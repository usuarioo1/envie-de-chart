import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WorkshopRegistration from '@/models/WorkshopRegistration';
import Workshop from '@/models/Workshop';
import { sendWorkshopRegistrationEmail } from '@/lib/brevo';

// GET - Fetch all registrations or registrations for a specific workshop
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const workshopId = searchParams.get('workshopId');
        const id = searchParams.get('id');

        if (id) {
            // Get single registration
            const registration = await WorkshopRegistration.findById(id);
            if (!registration) {
                return NextResponse.json(
                    { success: false, error: 'Inscription non trouvée' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, data: registration });
        }

        if (workshopId) {
            // Get registrations for specific workshop
            const registrations = await WorkshopRegistration.find({ workshopId })
                .sort({ createdAt: -1 });
            return NextResponse.json({ success: true, data: registrations });
        }

        // Get all registrations, sorted by most recent
        const registrations = await WorkshopRegistration.find()
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: registrations });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des inscriptions' },
            { status: 500 }
        );
    }
}

// POST - Create a new registration
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { workshopId, name, email, phone } = body;

        // Validation
        if (!workshopId || !name || !email || !phone) {
            return NextResponse.json(
                { success: false, error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Verify workshop exists
        const workshop = await Workshop.findById(workshopId);
        if (!workshop) {
            return NextResponse.json(
                { success: false, error: 'Atelier non trouvé' },
                { status: 404 }
            );
        }

        // Check if user is already registered for this workshop
        const existingRegistration = await WorkshopRegistration.findOne({
            workshopId,
            email: email.toLowerCase()
        });

        if (existingRegistration) {
            return NextResponse.json(
                { success: false, error: 'Vous êtes déjà inscrit à cet atelier' },
                { status: 400 }
            );
        }

        // Create registration
        const registration = await WorkshopRegistration.create({
            workshopId,
            workshopTitle: workshop.title,
            workshopDate: workshop.date,
            name,
            email,
            phone,
            status: 'pending'
        });

        try {
            await sendWorkshopRegistrationEmail({
                name,
                email,
                phone,
                workshopTitle: workshop.title,
                workshopDate: workshop.date
            });
        } catch (err) {
            console.error('Brevo email error (workshop-registration):', err);
        }

        return NextResponse.json(
            { success: true, data: registration, message: 'Inscription réussie!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating registration:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur lors de l\'inscription' },
            { status: 500 }
        );
    }
}

// PUT - Update registration status
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

        const registration = await WorkshopRegistration.findByIdAndUpdate(
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
        console.error('Error updating registration:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a registration
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

        const registration = await WorkshopRegistration.findByIdAndDelete(id);

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
        console.error('Error deleting registration:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        );
    }
}
