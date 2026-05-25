import connectDB from '@/lib/mongodb';
import Animateur from '@/models/Animateur';
import { NextResponse } from 'next/server';

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600'
};

// GET - Obtener animateurs (con filtro opcional por país)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    
    const filter = country ? { country, isActive: true } : { isActive: true };
    
    const animateurs = await Animateur.find(filter)
      .sort({ country: 1, name: 1 })
      .lean();
    
    return NextResponse.json(
      {
        success: true,
        data: animateurs
      },
      { headers: PUBLIC_CACHE_HEADERS }
    );
  } catch (error) {
    console.error('Error fetching animateurs:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener los animateurs' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo animateur
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    if (!body.name || !body.country) {
      return NextResponse.json(
        { success: false, error: 'Nombre y país son requeridos' },
        { status: 400 }
      );
    }
    
    const animateur = await Animateur.create(body);
    
    return NextResponse.json(
      { success: true, data: animateur },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating animateur:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al crear el animateur' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar animateur
export async function PUT(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      );
    }
    
    const animateur = await Animateur.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!animateur) {
      return NextResponse.json(
        { success: false, error: 'Animateur no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: animateur });
  } catch (error) {
    console.error('Error updating animateur:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al actualizar' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar animateur
export async function DELETE(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      );
    }
    
    const animateur = await Animateur.findByIdAndDelete(id);
    
    if (!animateur) {
      return NextResponse.json(
        { success: false, error: 'Animateur no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Animateur eliminado' 
    });
  } catch (error) {
    console.error('Error deleting animateur:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar' },
      { status: 500 }
    );
  }
}
