'use client';
import { useState, useEffect } from 'react';

export default function StagesSection() {
    const [stages, setStages] = useState([]);
    const [stageRegistrations, setStageRegistrations] = useState([]);
    const [stageInquiries, setStageInquiries] = useState([]);
    const [showStageForm, setShowStageForm] = useState(false);
    const [editingStage, setEditingStage] = useState(null);
    const [loadingStages, setLoadingStages] = useState(true);
    const [loadingStageRegistrations, setLoadingStageRegistrations] = useState(true);
    const [loadingStageInquiries, setLoadingStageInquiries] = useState(true);
    const [stageFormData, setStageFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        contact: { name: '' },
        email: '',
        phone: '',
        formatrice: '',
        country: ''
    });

    useEffect(() => {
        fetchStages();
        fetchStageRegistrations();
        fetchStageInquiries();
    }, []);

    const fetchStages = async () => {
        try {
            const response = await fetch('/api/stages');
            const data = await response.json();
            if (data.success) {
                setStages(data.data);
            }
        } catch (err) {
            console.error('Error fetching stages:', err);
        } finally {
            setLoadingStages(false);
        }
    };

    const fetchStageRegistrations = async () => {
        try {
            const response = await fetch('/api/stage-registrations');
            const data = await response.json();
            if (data.success) {
                setStageRegistrations(data.data);
            }
        } catch (err) {
            console.error('Error fetching stage registrations:', err);
        } finally {
            setLoadingStageRegistrations(false);
        }
    };

    const fetchStageInquiries = async () => {
        try {
            const response = await fetch('/api/stage-inquiries');
            const data = await response.json();
            if (data.success) {
                setStageInquiries(data.data);
            }
        } catch (err) {
            console.error('Error fetching stage inquiries:', err);
        } finally {
            setLoadingStageInquiries(false);
        }
    };

    const handleStageChange = (e) => {
        const { name, value } = e.target;
        if (name === 'contactName') {
            setStageFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, name: value }
            }));
        } else {
            setStageFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleStageSubmit = async (e) => {
        e.preventDefault();

        try {
            const isEditing = editingStage !== null;
            const method = isEditing ? 'PUT' : 'POST';
            const bodyData = isEditing
                ? { id: editingStage._id, ...stageFormData }
                : { ...stageFormData, status: 'published' };

            const response = await fetch('/api/stages', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();

            if (data.success) {
                setStageFormData({
                    title: '',
                    date: '',
                    location: '',
                    description: '',
                    contact: { name: '' },
                    email: '',
                    phone: '',
                    formatrice: '',
                    country: ''
                });
                setShowStageForm(false);
                setEditingStage(null);
                fetchStages();
            }
        } catch (err) {
            console.error('Error submitting stage:', err);
        }
    };

    const handleStageEdit = (stage) => {
        setEditingStage(stage);
        setStageFormData({
            title: stage.title,
            date: stage.date,
            location: stage.location,
            description: stage.description,
            contact: stage.contact || { name: '' },
            email: stage.email,
            phone: stage.phone,
            formatrice: stage.formatrice || '',
            country: stage.country || ''
        });
        setShowStageForm(true);
    };

    const handleStageCancelEdit = () => {
        setEditingStage(null);
        setStageFormData({
            title: '',
            date: '',
            location: '',
            description: '',
            contact: { name: '' },
            email: '',
            phone: '',
            formatrice: '',
            country: ''
        });
        setShowStageForm(false);
    };

    const handleStageDelete = async (stageId) => {
        if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer ce stage?')) return;

        try {
            const response = await fetch(`/api/stages?id=${stageId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) fetchStages();
        } catch (err) {
            console.error('Error deleting stage:', err);
        }
    };

    const handleStageRegistrationDelete = async (registrationId) => {
        if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette inscription?')) return;

        try {
            const response = await fetch(`/api/stage-registrations?id=${registrationId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) fetchStageRegistrations();
        } catch (err) {
            console.error('Error deleting registration:', err);
        }
    };

    const handleStageRegistrationStatusChange = async (registrationId, newStatus) => {
        try {
            const response = await fetch('/api/stage-registrations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: registrationId, status: newStatus })
            });

            const data = await response.json();
            if (data.success) fetchStageRegistrations();
        } catch (err) {
            console.error('Error updating registration status:', err);
        }
    };

    const handleToggleInquiryRead = async (inquiryId, currentStatus) => {
        try {
            const response = await fetch('/api/stage-inquiries', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: inquiryId, isRead: !currentStatus }),
            });

            const data = await response.json();
            if (data.success) fetchStageInquiries();
        } catch (err) {
            console.error('Error updating inquiry:', err);
        }
    };

    const handleDeleteInquiry = async (inquiryId) => {
        if (!confirm('⚠️ Supprimer cette demande?')) return;

        try {
            const response = await fetch(`/api/stage-inquiries?id=${inquiryId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) fetchStageInquiries();
        } catch (err) {
            console.error('Error deleting inquiry:', err);
        }
    };

    return (
        <>
            {/* Stages Management */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Gestion des Stages et Formations</h2>
                        <p className="text-sm text-gray-600 mt-1">Créez et gérez les stages et formations</p>
                    </div>
                    <button
                        onClick={() => {
                            if (showStageForm && !editingStage) {
                                setShowStageForm(false);
                            } else if (editingStage) {
                                handleStageCancelEdit();
                            } else {
                                setShowStageForm(true);
                                setEditingStage(null);
                            }
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F25A38] hover:bg-[#E84A28] transition-colors"
                    >
                        {showStageForm ? '✕ Annuler' : '+ Nouveau Stage'}
                    </button>
                </div>

                {/* Stage Form */}
                {showStageForm && (
                    <form onSubmit={handleStageSubmit} className="mb-8 p-6 bg-linear-to-br from-[#F2B988]/10 to-[#ABA0F2]/10 rounded-xl border border-[#F2B988]/30 space-y-4">
                        {editingStage && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800 font-medium">✏️ Mode édition</p>
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
                                    value={stageFormData.title}
                                    onChange={handleStageChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Formation au Chant..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="date"
                                    value={stageFormData.date}
                                    onChange={handleStageChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="2026-05-15"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lieu <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={stageFormData.location}
                                    onChange={handleStageChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Paris, France"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={stageFormData.email}
                                    onChange={handleStageChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="contact@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={stageFormData.phone}
                                    onChange={handleStageChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="+33 1 23 45 67 89"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Formatrice
                                </label>
                                <input
                                    type="text"
                                    name="formatrice"
                                    value={stageFormData.formatrice}
                                    onChange={handleStageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Nom de la formatrice"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pays
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={stageFormData.country}
                                    onChange={handleStageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="France"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact (Nom)
                                </label>
                                <input
                                    type="text"
                                    name="contactName"
                                    value={stageFormData.contact.name}
                                    onChange={handleStageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Nom du contact"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={stageFormData.description}
                                    onChange={handleStageChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                    placeholder="Description du stage..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#F25A38] text-white rounded-lg hover:bg-[#E84A28] transition-colors font-medium"
                            >
                                {editingStage ? 'Modifier' : 'Créer'}
                            </button>
                            {editingStage && (
                                <button
                                    type="button"
                                    onClick={handleStageCancelEdit}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {/* Stages List */}
                {loadingStages ? (
                    <p className="text-gray-500 text-center py-8">Chargement...</p>
                ) : stages.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aucun stage trouvé</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stages.map((stage) => (
                            <div key={stage._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900">{stage.title}</h3>
                                        <p className="text-sm text-gray-600 mt-2">{stage.description}</p>
                                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                            <p><strong>Date:</strong> {stage.date}</p>
                                            <p><strong>Lieu:</strong> {stage.location}</p>
                                            <p><strong>Email:</strong> {stage.email}</p>
                                            <p><strong>Téléphone:</strong> {stage.phone}</p>
                                            {stage.formatrice && <p><strong>Formatrice:</strong> {stage.formatrice}</p>}
                                            {stage.country && <p><strong>Pays:</strong> {stage.country}</p>}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex gap-2">
                                        <button
                                            onClick={() => handleStageEdit(stage)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleStageDelete(stage._id)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stage Inquiries */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Demandes de renseignements</h2>
                    <p className="text-sm text-gray-600 mt-1">Consultez les demandes d'informations sur les stages</p>
                </div>

                {loadingStageInquiries ? (
                    <p className="text-gray-500 text-center py-8">Chargement...</p>
                ) : stageInquiries.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aucune demande trouvée</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stageInquiries.map((inquiry) => {
                            const stage = stages.find(s => s._id === inquiry.stageId);
                            return (
                                <div
                                    key={inquiry._id}
                                    className={`border rounded-xl p-5 hover:shadow-md transition-all ${inquiry.isRead ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                                                {!inquiry.isRead && (
                                                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                                        Nouveau
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p><strong>Email:</strong> {inquiry.email}</p>
                                                <p><strong>Téléphone:</strong> {inquiry.phone}</p>
                                                {stage && <p><strong>Stage:</strong> {stage.title}</p>}
                                                <p><strong>Message:</strong> {inquiry.message}</p>
                                                <p><strong>Date:</strong> {new Date(inquiry.createdAt).toLocaleDateString('fr-FR')}</p>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-col gap-2">
                                            <button
                                                onClick={() => handleToggleInquiryRead(inquiry._id, inquiry.isRead)}
                                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                            >
                                                {inquiry.isRead ? 'Marquer non lu' : 'Marquer lu'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteInquiry(inquiry._id)}
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

            {/* Stage Registrations */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Inscriptions aux Stages</h2>
                    <p className="text-sm text-gray-600 mt-1">Gérez les inscriptions aux stages et formations</p>
                </div>

                {loadingStageRegistrations ? (
                    <p className="text-gray-500 text-center py-8">Chargement...</p>
                ) : stageRegistrations.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aucune inscription trouvée</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stageRegistrations.map((registration) => {
                            const stage = stages.find(s => s._id === registration.stageId);
                            return (
                                <div key={registration._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{registration.name}</h3>
                                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                <p><strong>Email:</strong> {registration.email}</p>
                                                <p><strong>Téléphone:</strong> {registration.phone}</p>
                                                {stage && <p><strong>Stage:</strong> {stage.title}</p>}
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
                                        <div className="ml-4 flex flex-col gap-2">
                                            <select
                                                value={registration.status}
                                                onChange={(e) => handleStageRegistrationStatusChange(registration._id, e.target.value)}
                                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                                            >
                                                <option value="pending">En attente</option>
                                                <option value="confirmed">Confirmé</option>
                                                <option value="cancelled">Annulé</option>
                                            </select>
                                            <button
                                                onClick={() => handleStageRegistrationDelete(registration._id)}
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
