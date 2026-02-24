'use client';
import { useState, useEffect } from 'react';
import { fromStorageFormat, createDisplayDate } from '@/utils/dateUtils';

export default function WorkshopsSection({ userId }) {
    const [workshops, setWorkshops] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [showWorkshopForm, setShowWorkshopForm] = useState(false);
    const [editingWorkshop, setEditingWorkshop] = useState(null);
    const [loadingWorkshops, setLoadingWorkshops] = useState(true);
    const [loadingRegistrations, setLoadingRegistrations] = useState(true);
    const [workshopFormData, setWorkshopFormData] = useState({
        title: '',
        description: '',
        date: '',
        price: ''
    });

    useEffect(() => {
        fetchWorkshops();
        fetchRegistrations();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await fetch('/api/workshops');
            const data = await response.json();
            if (data.success) {
                setWorkshops(data.data);
            }
        } catch (err) {
            console.error('Error fetching workshops:', err);
        } finally {
            setLoadingWorkshops(false);
        }
    };

    const fetchRegistrations = async () => {
        try {
            const response = await fetch('/api/workshop-registrations');
            const data = await response.json();
            if (data.success) {
                setRegistrations(data.data);
            }
        } catch (err) {
            console.error('Error fetching registrations:', err);
        } finally {
            setLoadingRegistrations(false);
        }
    };

    const handleWorkshopChange = (e) => {
        const { name, value, type } = e.target;
        setWorkshopFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleWorkshopSubmit = async (e) => {
        e.preventDefault();
        const method = editingWorkshop ? 'PUT' : 'POST';
        const endpoint = '/api/workshops';

        try {
            const payload = editingWorkshop
                ? { id: editingWorkshop._id, ...workshopFormData }
                : { ...workshopFormData, userId };

            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.success) {
                fetchWorkshops();
                setWorkshopFormData({ title: '', description: '', date: '', price: '' });
                setShowWorkshopForm(false);
                setEditingWorkshop(null);
            }
        } catch (err) {
            console.error('Error submitting workshop:', err);
        }
    };

    const handleWorkshopEdit = (workshop) => {
        setEditingWorkshop(workshop);
        setWorkshopFormData({
            title: workshop.title,
            description: workshop.description,
            date: fromStorageFormat(workshop.date),
            price: workshop.price
        });
        setShowWorkshopForm(true);
    };

    const handleCancelWorkshopEdit = () => {
        setEditingWorkshop(null);
        setWorkshopFormData({ title: '', description: '', date: '', price: '' });
        setShowWorkshopForm(false);
    };

    const handleWorkshopDuplicate = (workshop) => {
        // Copy the workshop data but exclude the ID (to create a new one)
        setEditingWorkshop(null); // Important: no editingWorkshop means it will create new
        setWorkshopFormData({
            title: `${workshop.title} (copie)`,
            description: workshop.description,
            date: fromStorageFormat(workshop.date),
            price: workshop.price
        });
        setShowWorkshopForm(true);
    };

    const handleWorkshopDelete = async (workshopId) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) return;

        try {
            const response = await fetch(`/api/workshops?id=${workshopId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) fetchWorkshops();
        } catch (err) {
            console.error('Error deleting workshop:', err);
        }
    };

    const handleRegistrationDelete = async (registrationId) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) return;

        try {
            const response = await fetch(`/api/workshop-registrations?id=${registrationId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) fetchRegistrations();
        } catch (err) {
            console.error('Error deleting registration:', err);
        }
    };

    const handleRegistrationStatusChange = async (registrationId, newStatus) => {
        try {
            const response = await fetch('/api/workshop-registrations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: registrationId, status: newStatus }),
            });

            const data = await response.json();
            if (data.success) fetchRegistrations();
        } catch (err) {
            console.error('Error updating registration status:', err);
        }
    };

    return (
        <>
            {/* Workshops Management */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Gestion des Ateliers</h2>
                        <p className="text-sm text-gray-600 mt-1">Créez et gérez les ateliers de chant</p>
                    </div>
                    <button
                        onClick={() => {
                            if (showWorkshopForm && !editingWorkshop) {
                                setShowWorkshopForm(false);
                            } else if (editingWorkshop) {
                                handleCancelWorkshopEdit();
                            } else {
                                setShowWorkshopForm(true);
                                setEditingWorkshop(null);
                            }
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F25A38] hover:bg-[#E84A28] transition-colors"
                    >
                        {showWorkshopForm ? '✕ Annuler' : '+ Nouvel Atelier'}
                    </button>
                </div>

                {showWorkshopForm && (
                    <form onSubmit={handleWorkshopSubmit} className="mb-8 p-6 bg-linear-to-br from-[#F2B988]/10 to-[#ABA0F2]/10 rounded-xl border border-[#F2B988]/30 space-y-4">
                        {editingWorkshop && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800 font-medium">✏️ Mode édition</p>
                            </div>
                        )}
                        {!editingWorkshop && workshopFormData.title && workshopFormData.title.includes('(copie)') && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800 font-medium">📋 Duplication d'atelier - Modifiez les données avant de créer</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={workshopFormData.title}
                                    onChange={handleWorkshopChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Chant prénatal..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix (€)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={workshopFormData.price}
                                    onChange={handleWorkshopChange}
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="25.00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date et heure <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={workshopFormData.date}
                                    onChange={handleWorkshopChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={workshopFormData.description}
                                    onChange={handleWorkshopChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Description de l'atelier..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#F25A38] text-white rounded-lg hover:bg-[#E84A28] transition-colors font-medium"
                            >
                                {editingWorkshop ? 'Modifier' : 'Créer'}
                            </button>
                            {editingWorkshop && (
                                <button
                                    type="button"
                                    onClick={handleCancelWorkshopEdit}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {loadingWorkshops ? (
                    <p className="text-gray-500 text-center py-8">Chargement...</p>
                ) : workshops.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aucun atelier trouvé</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {workshops.map((workshop) => {
                            const workshopDate = createDisplayDate(workshop.date);
                            const isUpcoming = workshopDate > new Date();

                            return (
                                <div
                                    key={workshop._id}
                                    className={`border rounded-xl p-5 hover:shadow-md transition-all ${isUpcoming ? 'border-[#F2B988] bg-linear-to-br from-white to-[#F2B988]/5' : 'border-gray-200 bg-gray-50 opacity-75'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4 flex-1">
                                            <div className="shrink-0 w-16 h-16 bg-linear-to-br from-[#F25A38] to-[#F29057] rounded-lg flex flex-col items-center justify-center text-white shadow-md">
                                                <span className="text-xs font-semibold">{workshopDate.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</span>
                                                <span className="text-2xl font-bold">{workshopDate.getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900">{workshop.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{workshop.description}</p>
                                                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                                                    <span>📅 {workshopDate.toLocaleDateString('fr-FR')}</span>
                                                    <span>🕐 {workshopDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} <span className="text-xs opacity-75">(hora de Paris)</span></span>
                                                    {workshop.price && <span className="font-semibold text-[#F25A38]">💰 {workshop.price.toFixed(2)} €</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex gap-2">
                                            <button
                                                onClick={() => handleWorkshopEdit(workshop)}
                                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleWorkshopDuplicate(workshop)}
                                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                                title="Dupliquer cet atelier"
                                            >
                                                Dupliquer
                                            </button>
                                            <button
                                                onClick={() => handleWorkshopDelete(workshop._id)}
                                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Workshop Registrations */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Inscriptions aux Ateliers</h2>
                    <p className="text-sm text-gray-600 mt-1">Gérez les inscriptions des participants</p>
                </div>

                {loadingRegistrations ? (
                    <p className="text-gray-500 text-center py-8">Chargement...</p>
                ) : registrations.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aucune inscription trouvée</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {registrations.map((registration) => {
                            const workshop = workshops.find(w => w._id === registration.workshopId);
                            return (
                                <div key={registration._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4 flex-1">
                                            <div className="shrink-0 h-10 w-10 bg-linear-to-br from-[#F25A38] to-[#F29057] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">👤</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{registration.name}</h3>
                                                <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                    <p><strong>Email:</strong> {registration.email}</p>
                                                    <p><strong>Téléphone:</strong> {registration.phone}</p>
                                                    {workshop && <p><strong>Atelier:</strong> {workshop.title}</p>}
                                                    <p><strong>Date d'inscription:</strong> {new Date(registration.createdAt).toLocaleDateString('fr-FR')}</p>
                                                    <p>
                                                        <strong>Statut:</strong>{' '}
                                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {registration.status}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-col gap-2">
                                            <select
                                                value={registration.status}
                                                onChange={(e) => handleRegistrationStatusChange(registration._id, e.target.value)}
                                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                            >
                                                <option value="pending">En attente</option>
                                                <option value="confirmed">Confirmé</option>
                                                <option value="cancelled">Annulé</option>
                                            </select>
                                            <button
                                                onClick={() => handleRegistrationDelete(registration._id)}
                                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
