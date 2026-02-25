import mongoose from 'mongoose';

const AnimateurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'El país es requerido'],
    enum: ['france', 'espana', 'belgique', 'suisse', 'canada', 'portugal', 'deutschland', 'amerique-du-sud']
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    trim: true
  },
  departement: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

AnimateurSchema.index({ country: 1, isActive: 1 });

export default mongoose.models.Animateur || mongoose.model('Animateur', AnimateurSchema);
