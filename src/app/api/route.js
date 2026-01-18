import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        message: 'API conectado',
        status: 'success',
        timestamp: new Date().toISOString()
    }, { status: 200 });
}
