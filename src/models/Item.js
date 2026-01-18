import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor proporciona un nombre'],
        maxlength: [60, 'El nombre no puede ser mayor a 60 caracteres'],
    },
    descripcion: {
        type: String,
        required: false,
        maxlength: [200, 'La descripción no puede ser mayor a 200 caracteres'],
    },
    precio: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Actualiza automáticamente updatedAt antes de guardar
ItemSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
