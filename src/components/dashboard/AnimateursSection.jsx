'use client';
import { useState, useEffect } from 'react';

export default function AnimateursSection() {
    const [animateurs, setAnimateurs] = useState([]);
    const [showAnimateurForm, setShowAnimateurForm] = useState(false);
    const [showAnimateursList, setShowAnimateursList] = useState(true);
    const [editingAnimateur, setEditingAnimateur] = useState(null);
    const [loadingAnimateurs, setLoadingAnimateurs] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [animateurFormData, setAnimateurFormData] = useState({
        name: '',
        country: '',
        phone: '',
        email: '',
        city: '',
        region: '',
        departement: '',
        isActive: true
    });

    useEffect(() => {
        fetchAnimateurs();
    }, [selectedCountry]);

    const fetchAnimateurs = async () => {
        try {
            setLoadingAnimateurs(true);
            const url = selectedCountry === 'all'
                ? '/api/animateurs'
                : `/api/animateurs?country=${selectedCountry}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                setAnimateurs(data.data);
            }
        } catch (err) {
            console.error('Error fetching animateurs:', err);
        } finally {
            setLoadingAnimateurs(false);
        }
    };

    const handleAnimateurChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnimateurFormData({
            ...animateurFormData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAnimateurSubmit = async (e) => {
        e.preventDefault();

        try {
            const isEditing = editingAnimateur !== null;
            const method = isEditing ? 'PUT' : 'POST';
            const bodyData = isEditing
                ? { _id: editingAnimateur._id, ...animateurFormData }
                : animateurFormData;

            const response = await fetch('/api/animateurs', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            if (data.success && data.data) {
                const savedAnimateur = data.data;
                const matchesCurrentFilter = selectedCountry === 'all' || savedAnimateur.country === selectedCountry;

                setAnimateurs(prev => {
                    const exists = prev.some(animateur => animateur._id === savedAnimateur._id);

                    if (!matchesCurrentFilter) {
                        return prev.filter(animateur => animateur._id !== savedAnimateur._id);
                    }

                    const next = exists
                        ? prev.map(animateur => animateur._id === savedAnimateur._id ? savedAnimateur : animateur)
                        : [...prev, savedAnimateur];

                    return [...next].sort((a, b) => {
                        const byCountry = (a.country || '').localeCompare(b.country || '');
                        if (byCountry !== 0) return byCountry;
                        return (a.name || '').localeCompare(b.name || '');
                    });
                });

                setAnimateurFormData({
                    name: '',
                    country: '',
                    phone: '',
                    email: '',
                    city: '',
                    region: '',
                    departement: '',
                    isActive: true
                });
                setShowAnimateurForm(false);
                setEditingAnimateur(null);
            }
        } catch (err) {
            console.error('Error submitting animateur:', err);
        }
    };

    const handleAnimateurEdit = (animateur) => {
        setEditingAnimateur(animateur);
        setAnimateurFormData({
            name: animateur.name || '',
            country: animateur.country || '',
            phone: animateur.phone || '',
            email: animateur.email || '',
            city: animateur.city || '',
            region: animateur.region || '',
            departement: animateur.departement || '',
            isActive: animateur.isActive !== undefined ? animateur.isActive : true
        });
        setShowAnimateurForm(true);
    };

    const handleCancelAnimateurEdit = () => {
        setEditingAnimateur(null);
        setAnimateurFormData({
            name: '',
            country: '',
            phone: '',
            email: '',
            city: '',
            region: '',
            departement: '',
            isActive: true
        });
        setShowAnimateurForm(false);
    };

    const handleAnimateurDelete = async (animateurId) => {
        if (!confirm('⚠️ Supprimer cet animateur?')) return;

        try {
            const response = await fetch(`/api/animateurs?id=${animateurId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) {
                setAnimateurs(prev => prev.filter(animateur => animateur._id !== animateurId));
            }
        } catch (err) {
            console.error('Error deleting animateur:', err);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Gestion des Animateurs</h2>
                        <p className="text-sm text-gray-600 mt-1">Gérer les animateurs par pays</p>
                    </div>
                    <button
                        onClick={() => setShowAnimateursList(!showAnimateursList)}
                        className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
                        title={showAnimateursList ? 'Masquer la liste' : 'Afficher la liste'}
                    >
                        {showAnimateursList ? (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Masquer
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Afficher
                            </>
                        )}
                    </button>
                </div>
                <button
                    onClick={() => setShowAnimateurForm(!showAnimateurForm)}
                    className="px-6 py-3 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    {showAnimateurForm ? 'Masquer' : '+ Nouvel Animateur'}
                </button>
            </div>

            {/* Country Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filtrer par pays
                </label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">Tous les pays</option>
                    <option value="france">France</option>
                    <option value="espana">España</option>
                    <option value="belgique">Belgique</option>
                    <option value="suisse">Suisse</option>
                    <option value="canada">Canada</option>
                    <option value="portugal">Portugal</option>
                    <option value="deutschland">Deutschland</option>
                    <option value="amerique-du-sud">Amérique du Sud</option>
                </select>
            </div>

            {/* Form */}
            {showAnimateurForm && (
                <form onSubmit={handleAnimateurSubmit} className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingAnimateur ? 'Modifier l\'animateur' : 'Créer un nouvel animateur'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom complet <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={animateurFormData.name}
                                onChange={handleAnimateurChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Marie Dupont"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pays <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="country"
                                value={animateurFormData.country}
                                onChange={handleAnimateurChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Sélectionner</option>
                                <option value="france">France</option>
                                <option value="espana">España</option>
                                <option value="belgique">Belgique</option>
                                <option value="suisse">Suisse</option>
                                <option value="canada">Canada</option>
                                <option value="portugal">Portugal</option>
                                <option value="deutschland">Deutschland</option>
                                <option value="amerique-du-sud">Amérique du Sud</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Téléphone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={animateurFormData.phone}
                                onChange={handleAnimateurChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="+33 1 23 45 67 89"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={animateurFormData.email}
                                onChange={handleAnimateurChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="contact@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ville
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={animateurFormData.city}
                                onChange={handleAnimateurChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Paris"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Région
                            </label>
                            <input
                                type="text"
                                name="region"
                                value={animateurFormData.region}
                                onChange={handleAnimateurChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Île-de-France"
                            />
                        </div>

                        {animateurFormData.country === 'france' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Département <span className="text-blue-500 text-xs">(France uniquement)</span>
                                </label>
                                <input
                                    type="text"
                                    name="departement"
                                    value={animateurFormData.departement}
                                    onChange={handleAnimateurChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="75 - Paris"
                                />
                            </div>
                        )}

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={animateurFormData.isActive}
                                onChange={handleAnimateurChange}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Actif
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            type="submit"
                            className="px-6 py-3 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            {editingAnimateur ? 'Modifier' : 'Créer'}
                        </button>
                        {editingAnimateur && (
                            <button
                                type="button"
                                onClick={handleCancelAnimateurEdit}
                                className="px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </form>
            )}

            {/* List */}
            {showAnimateursList && (
                loadingAnimateurs ? (
                    <p className="text-gray-500 text-center py-8">Chargement...</p>
                ) : animateurs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aucun animateur trouvé</p>
                    </div>
                ) : selectedCountry === 'france' ? (
                    // Grouped by region for France
                    (() => {
                        // Group animateurs by region
                        const groupedByRegion = animateurs.reduce((acc, animateur) => {
                            const region = animateur.region || 'Sans région';
                            if (!acc[region]) {
                                acc[region] = [];
                            }
                            acc[region].push(animateur);
                            return acc;
                        }, {});

                        // Sort regions alphabetically, but put "Sans région" at the end
                        const sortedRegions = Object.keys(groupedByRegion).sort((a, b) => {
                            if (a === 'Sans région') return 1;
                            if (b === 'Sans région') return -1;
                            return a.localeCompare(b, 'fr');
                        });

                        return (
                            <div className="space-y-8">
                                {sortedRegions.map((region) => (
                                    <div key={region}>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-300">
                                            {region}
                                            <span className="ml-2 text-sm font-normal text-gray-600">
                                                ({groupedByRegion[region].length} animateur{groupedByRegion[region].length > 1 ? 's' : ''})
                                            </span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                            {groupedByRegion[region].map((animateur) => (
                                                <div
                                                    key={animateur._id}
                                                    className={`border rounded-xl p-4 hover:shadow-md transition-all h-full flex flex-col ${animateur.isActive ? 'border-indigo-200 bg-indigo-50/50' : 'border-gray-200 bg-gray-50 opacity-60'
                                                        }`}
                                                >
                                                    <div className="flex flex-col h-full">
                                                        <div className="flex items-start gap-3 mb-3">
                                                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                                {animateur.name.charAt(0)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-sm font-semibold text-gray-900 truncate" title={animateur.name}>{animateur.name}</h3>
                                                                {!animateur.isActive && (
                                                                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-600 rounded-full mt-1">
                                                                        Inactif
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-1 text-xs text-gray-600 mb-3">
                                                            <p className="truncate" title={animateur.country}><strong>Pays:</strong> {animateur.country}</p>
                                                            {animateur.city && <p className="truncate" title={animateur.city}><strong>Ville:</strong> {animateur.city}</p>}
                                                            {animateur.phone && <p className="truncate" title={animateur.phone}><strong>Tél:</strong> {animateur.phone}</p>}
                                                            {animateur.email && <p className="truncate" title={animateur.email}><strong>Email:</strong> {animateur.email}</p>}
                                                            {animateur.region && <p className="truncate" title={animateur.region}><strong>Région:</strong> {animateur.region}</p>}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleAnimateurEdit(animateur)}
                                                                className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                                            >
                                                                Modifier
                                                            </button>
                                                            <button
                                                                onClick={() => handleAnimateurDelete(animateur._id)}
                                                                className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()
                ) : (
                    // Regular grid for other countries
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {animateurs.map((animateur) => (
                            <div
                                key={animateur._id}
                                className={`border rounded-xl p-4 hover:shadow-md transition-all h-full flex flex-col ${animateur.isActive ? 'border-indigo-200 bg-indigo-50/50' : 'border-gray-200 bg-gray-50 opacity-60'
                                    }`}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {animateur.country === 'france' && animateur.departement 
                                                ? animateur.departement.split('-')[0].trim().match(/\d+/)?.[0] || animateur.name.charAt(0)
                                                : animateur.name.charAt(0)
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate" title={animateur.name}>{animateur.name}</h3>
                                            {!animateur.isActive && (
                                                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-600 rounded-full mt-1">
                                                    Inactif
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-1 text-xs text-gray-600 mb-3">
                                        <p className="truncate" title={animateur.country}><strong>Pays:</strong> {animateur.country}</p>
                                        {animateur.city && <p className="truncate" title={animateur.city}><strong>Ville:</strong> {animateur.city}</p>}
                                        {animateur.phone && <p className="truncate" title={animateur.phone}><strong>Tél:</strong> {animateur.phone}</p>}
                                        {animateur.email && <p className="truncate" title={animateur.email}><strong>Email:</strong> {animateur.email}</p>}
                                        {animateur.region && <p className="truncate" title={animateur.region}><strong>Région:</strong> {animateur.region}</p>}
                                        {animateur.departement && <p className="truncate" title={animateur.departement}><strong>Département:</strong> {animateur.departement}</p>}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAnimateurEdit(animateur)}
                                            className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleAnimateurDelete(animateur._id)}
                                            className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
