import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
        maxlength: [200, 'Subject cannot be more than 200 characters']
    },
    interest: {
        type: String,
        required: false,
        enum: ['', 'ateliers', 'prenatal', 'stages', 'animateurs', 'general', 'autre'],
        default: ''
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        maxlength: [5000, 'Message cannot be more than 5000 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
