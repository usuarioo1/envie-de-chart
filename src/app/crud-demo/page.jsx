'use client';

import { useState, useEffect } from 'react';

export default function ItemsPage() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Cargar items al montar el componente
    useEffect(() => {
        fetchItems();
    }, []);

    // Obtener todos los items
    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            if (data.success) {
                setItems(data.data);
            }
        } catch (error) {
            console.error('Error al cargar items:', error);
        }
    };

    // Crear o actualizar item
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = editingId ? `/api/items/${editingId}` : '/api/items';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    descripcion: formData.descripcion,
                    precio: parseFloat(formData.precio) || 0,
                }),
            });

            const data = await response.json();

            if (data.success) {
                await fetchItems();
                setFormData({ nombre: '', descripcion: '', precio: '' });
                setEditingId(null);
                alert(editingId ? 'Item actualizado' : 'Item creado');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar el item');
        } finally {
            setLoading(false);
        }
    };

    // Eliminar item
    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este item?')) return;

        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                await fetchItems();
                alert('Item eliminado');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el item');
        }
    };

    // Preparar edición
    const handleEdit = (item) => {
        setFormData({
            nombre: item.nombre,
            descripcion: item.descripcion || '',
            precio: item.precio || '',
        });
        setEditingId(item._id);
    };

    // Cancelar edición
    const handleCancel = () => {
        setFormData({ nombre: '', descripcion: '', precio: '' });
        setEditingId(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">CRUD MongoDB + Next.js</h1>

            {/* Formulario */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold mb-4">
                    {editingId ? 'Editar Item' : 'Crear Nuevo Item'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Descripción
                        </label>
                        <textarea
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            rows="3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Precio
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.precio}
                            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#F25A38] hover:bg-[#732514] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de items */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <h2 className="text-xl font-bold mb-4">Lista de Items</h2>
                {items.length === 0 ? (
                    <p className="text-gray-500">No hay items para mostrar</p>
                ) : (
                    <div className="grid gap-4">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded p-4 flex justify-between items-start"
                            >
                                <div>
                                    <h3 className="font-bold text-lg">{item.nombre}</h3>
                                    {item.descripcion && (
                                        <p className="text-gray-600">{item.descripcion}</p>
                                    )}
                                    {item.precio && (
                                        <p className="text-green-600 font-bold">${item.precio}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-2">
                                        Creado: {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
