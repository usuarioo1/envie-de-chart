import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Por favor define la variable MONGODB_URI en tu archivo .env.local'
    );
}

/**
 * Global se usa aquí para mantener una conexión en caché durante el desarrollo.
 * Esto previene que se creen múltiples conexiones durante hot reloading.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log('✅ Usando conexión existente a MongoDB');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        console.log('🔄 Conectando a MongoDB...');
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB conectado exitosamente');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('❌ Error al conectar a MongoDB:', e.message);
        throw e;
    }

    return cached.conn;
}

export default connectDB;
