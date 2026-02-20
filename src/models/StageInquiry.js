import mongoose from 'mongoose';

const StageInquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis']
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis']
    },
    phone: {
        type: String,
        required: [true, 'Le téléphone est requis']
    },
    formationNumber: {
        type: Number,
        required: [true, 'Le numéro de formation est requis']
    },
    formationTitle: {
        type: String,
        required: [true, 'Le titre de formation est requis']
    },
    source: {
        type: String,
        required: false,
        default: 'stages-et-formations'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.models.StageInquiry || mongoose.model('StageInquiry', StageInquirySchema);
