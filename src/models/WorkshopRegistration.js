import mongoose from 'mongoose';

const WorkshopRegistrationSchema = new mongoose.Schema({
    workshopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop',
        required: [true, 'L\'ID de l\'atelier est requis']
    },
    workshopTitle: {
        type: String,
        required: [true, 'Le titre de l\'atelier est requis']
    },
    workshopDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true,
        maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir une adresse email valide']
    },
    phone: {
        type: String,
        required: [true, 'Le téléphone est requis'],
        trim: true,
        maxlength: [20, 'Le téléphone ne peut pas dépasser 20 caractères']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Index for better query performance
WorkshopRegistrationSchema.index({ workshopId: 1, email: 1 });

export default mongoose.models.WorkshopRegistration || mongoose.model('WorkshopRegistration', WorkshopRegistrationSchema);
