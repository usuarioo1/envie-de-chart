import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Veuillez fournir un titre'],
        maxlength: [150, 'Le titre ne peut pas dépasser 150 caractères']
    },
    description: {
        type: String,
        required: [true, 'Veuillez fournir une description'],
        maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
    },
    date: {
        type: Date,
        required: [true, 'Veuillez fournir une date']
    },
    dayOfWeek: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);
