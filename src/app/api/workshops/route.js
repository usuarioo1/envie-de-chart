import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Workshop from '@/models/Workshop';
import User from '@/models/User'; // Needed for populate to work

const PUBLIC_CACHE_HEADERS = {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
};

// GET - Fetch all workshops or a specific workshop by ID
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const workshop = await Workshop.findById(id)
                .populate('createdBy', 'name email')
                .lean();
            if (!workshop) {
                return NextResponse.json(
                    { success: false, error: 'Atelier non trouvé' },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { success: true, data: workshop },
                { headers: PUBLIC_CACHE_HEADERS }
            );
        }

        // Fetch all active workshops, sorted by date (upcoming first)
        const workshops = await Workshop.find({ isActive: true })
            .populate('createdBy', 'name email')
            .sort({ date: 1 })
            .lean();

        return NextResponse.json(
            { success: true, data: workshops },
            { headers: PUBLIC_CACHE_HEADERS }
        );
    } catch (error) {
        console.error('Error fetching workshops:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des ateliers' },
            { status: 500 }
        );
    }
}

// POST - Create a new workshop
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { title, description, date, userId, price } = body;

        // Validation
        if (!title || !description || !date || !userId) {
            return NextResponse.json(
                { success: false, error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Calculate day of week without timezone conversion
        // Parse the date components directly from the datetime-local string
        const match = date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
        let dayOfWeek = 'Lundi'; // default
        
        if (match) {
            const [, year, month, day, hour, minute] = match;
            // Create date using local components (no UTC conversion)
            const localDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
            const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
            dayOfWeek = daysOfWeek[localDate.getDay()];
        }

        // Store date as string to preserve exact time without timezone conversion
        const workshop = await Workshop.create({
            title,
            description,
            date: date, // Store as-is from datetime-local input
            dayOfWeek,
            price: price || 0,
            createdBy: userId,
        });

        const populatedWorkshop = await Workshop.findById(workshop._id).populate('createdBy', 'name email');

        return NextResponse.json(
            { success: true, data: populatedWorkshop },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating workshop:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur lors de la création de l\'atelier' },
            { status: 500 }
        );
    }
}

// PUT - Update a workshop
export async function PUT(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { id, title, description, date, isActive, price } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID de l\'atelier requis' },
                { status: 400 }
            );
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (date !== undefined) {
            // Store date as string to preserve exact time without timezone conversion
            updateData.date = date;
            
            // Calculate day of week without timezone conversion
            const match = date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
            if (match) {
                const [, year, month, day, hour, minute] = match;
                const localDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
                const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
                updateData.dayOfWeek = daysOfWeek[localDate.getDay()];
            }
        }
        if (price !== undefined) updateData.price = price;
        if (isActive !== undefined) updateData.isActive = isActive;
        updateData.updatedAt = Date.now();

        const workshop = await Workshop.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        if (!workshop) {
            return NextResponse.json(
                { success: false, error: 'Atelier non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: workshop });
    } catch (error) {
        console.error('Error updating workshop:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur lors de la mise à jour de l\'atelier' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a workshop (soft delete by setting isActive to false)
export async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID de l\'atelier requis' },
                { status: 400 }
            );
        }

        // Soft delete - just set isActive to false
        const workshop = await Workshop.findByIdAndUpdate(
            id,
            { isActive: false, updatedAt: Date.now() },
            { new: true }
        );

        if (!workshop) {
            return NextResponse.json(
                { success: false, error: 'Atelier non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Atelier supprimé avec succès' });
    } catch (error) {
        console.error('Error deleting workshop:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression de l\'atelier' },
            { status: 500 }
        );
    }
}
