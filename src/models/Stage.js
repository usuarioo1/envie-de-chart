import mongoose from 'mongoose';

const StageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'La date est requise']
    },
    location: {
        type: String,
        required: [true, 'Le lieu est requis'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La description est requise']
    },
    contact: {
        name: String,
        email: String,
        phone: String
    },
    email: {
        type: String,
        required: [true, 'Email requis'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir une adresse email valide']
    },
    phone: {
        type: String,
        required: [true, 'Téléphone requis'],
        trim: true
    },
    formatrice: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['published', 'draft', 'archived'],
        default: 'published'
    }
}, {
    timestamps: true
});

export default mongoose.models.Stage || mongoose.model('Stage', StageSchema);
