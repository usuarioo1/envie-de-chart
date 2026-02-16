import mongoose from 'mongoose';

const StageRegistrationSchema = new mongoose.Schema({
    stageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stage',
        required: [true, 'L\'ID du stage est requis']
    },
    stageTitle: {
        type: String,
        required: [true, 'Le titre du stage est requis']
    },
    stageDate: {
        type: String,
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
StageRegistrationSchema.index({ stageId: 1, email: 1 });

export default mongoose.models.StageRegistration || mongoose.model('StageRegistration', StageRegistrationSchema);
