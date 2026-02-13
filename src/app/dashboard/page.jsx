'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    date: ''
  });
  const [workshopFormData, setWorkshopFormData] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Check if user is admin
    if (parsedUser.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchUsers();
    setUser(parsedUser);
    fetchEvents();
    fetchWorkshops();
    fetchRegistrations();
  }, [router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

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

  const handleRoleChange = async (userId, newRole) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`✅ User role updated to ${newRole}!`);
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to update role');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          userId: user.id
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Event created successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          date: ''
        });
        setShowEventForm(false);
        fetchEvents();
      } else {
        setError(data.error || 'Failed to create event');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (eventId) => {
    if (!confirm('⚠️ Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/events?id=${eventId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Event deleted successfully!');
        fetchEvents();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to delete event');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWorkshopChange = (e) => {
    setWorkshopFormData({
      ...workshopFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleWorkshopSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const isEditing = editingWorkshop !== null;
      const url = isEditing ? '/api/workshops' : '/api/workshops';
      const method = isEditing ? 'PUT' : 'POST';

      const bodyData = isEditing
        ? { id: editingWorkshop._id, ...workshopFormData }
        : { ...workshopFormData, userId: user.id };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditing ? '✅ Atelier modifié avec succès!' : '✅ Atelier créé avec succès!');
        setWorkshopFormData({
          title: '',
          description: '',
          date: ''
        });
        setShowWorkshopForm(false);
        setEditingWorkshop(null);
        fetchWorkshops();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || `Échec de ${isEditing ? 'la modification' : 'la création'} de l'atelier`);
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  const handleWorkshopEdit = (workshop) => {
    const workshopDate = new Date(workshop.date);
    const formattedDate = new Date(workshopDate.getTime() - workshopDate.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);

    setEditingWorkshop(workshop);
    setWorkshopFormData({
      title: workshop.title,
      description: workshop.description,
      date: formattedDate
    });
    setShowWorkshopForm(true);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingWorkshop(null);
    setWorkshopFormData({
      title: '',
      description: '',
      date: ''
    });
    setShowWorkshopForm(false);
  };

  const handleWorkshopDelete = async (workshopId) => {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cet atelier?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/workshops?id=${workshopId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Atelier supprimé avec succès!');
        fetchWorkshops();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la suppression de l\'atelier');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  const handleRegistrationDelete = async (registrationId) => {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette inscription?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/workshop-registrations?id=${registrationId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Inscription supprimée avec succès!');
        fetchRegistrations();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la suppression');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  const handleRegistrationStatusChange = async (registrationId, newStatus) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/workshop-registrations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: registrationId, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`✅ Statut mis à jour: ${newStatus}!`);
        fetchRegistrations();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la mise à jour');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image
                  src="/assets/icon/icono.png"
                  alt="Envie de Chanter Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              {/* Text */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
                <p className="mt-2 text-gray-600">
                  Bienvenue, {user?.name}!
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {user?.role}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/users"
                className="px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50"
              >
                Voir les utilisateurs
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Déconnecter
              </button>
            </div>
          </div>
        </div>


        {/* Notifications */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-800">{success}</div>
          </div>
        )}

        {/* para activar esta seccion descomentarla */}
        {/* <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Créer un Événement</h2>
            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {showEventForm ? 'Annuler' : 'Nouvel Événement'}
            </button>
          </div>

          {showEventForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (€)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Localisation
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Créer un événement
              </button>
            </form>
          )}
        </div> */}

        {/* Events List
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Tous les Événements</h2>
            <Link
              href="/agenda/calendrier"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Voir le Calendrier
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="text-gray-500">No events yet. Create your first event!</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <p>📍 {event.location}</p>
                        <p>💰 €{event.price}</p>
                        <p>📅 {new Date(event.date).toLocaleString()}</p>
                        {event.createdBy && (
                          <p>👤 Created by: {event.createdBy.name}</p>
                        )}
                      </div>
                    </div>
                    {(user?.role === 'admin' || event.createdBy?._id === user?.id) && (
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center gap-2"
                        title="Delete this event"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* Contact Messages Section */}
        <div className="bg-white shadow rounded-lg p-6 mt-2 mb-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Messages de Contact</h2>
              <p className="text-gray-600 mt-1">Gérez les messages reçus via le formulaire de contact</p>
            </div>
            <Link
              href="/dashboard/contact-messages"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F25A38] hover:bg-[#E84A28] transition-colors"
            >
              Voir les Messages →
            </Link>
          </div>
        </div>

        {/* Workshops Section - Ateliers à venir */}
        <div className="bg-white shadow rounded-lg p-6 mt-2 mb-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ateliers à venir</h2>
              <p className="text-gray-600 mt-1">Gérez les prochains ateliers de chant</p>
            </div>
            <button
              onClick={() => {
                if (showWorkshopForm && !editingWorkshop) {
                  setShowWorkshopForm(false);
                } else if (editingWorkshop) {
                  handleCancelEdit();
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

          {/* Workshop Form */}
          {showWorkshopForm && (
            <form onSubmit={handleWorkshopSubmit} className="mb-8 p-6 bg-gradient-to-br from-[#F2B988]/10 to-[#ABA0F2]/10 rounded-xl border border-[#F2B988]/30 space-y-4">
              {editingWorkshop && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">✏️ Mode édition - Modification de l'atelier</p>
                </div>
              )}
              <div>
                <label htmlFor="workshop-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de l'atelier <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="workshop-title"
                  name="title"
                  required
                  value={workshopFormData.title}
                  onChange={handleWorkshopChange}
                  placeholder="Ex: Atelier de chant prénatal"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="workshop-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="workshop-description"
                  name="description"
                  required
                  rows="3"
                  value={workshopFormData.description}
                  onChange={handleWorkshopChange}
                  placeholder="Une brève description de l'atelier..."
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="workshop-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date et heure <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="workshop-date"
                  name="date"
                  required
                  value={workshopFormData.date}
                  onChange={handleWorkshopChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#F25A38] hover:bg-[#E84A28] transition-colors shadow-sm"
                >
                  {editingWorkshop ? '✓ Modifier l\'atelier' : '✓ Créer l\'atelier'}
                </button>
                {editingWorkshop && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Workshops List */}
          {loadingWorkshops ? (
            <p className="text-gray-500 text-center py-8">Chargement des ateliers...</p>
          ) : workshops.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">Aucun atelier à venir</p>
              <p className="text-gray-400 text-sm mt-2">Créez votre premier atelier en cliquant sur le bouton ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-4">
              {workshops.map((workshop) => {
                const workshopDate = new Date(workshop.date);
                const isUpcoming = workshopDate > new Date();

                return (
                  <div
                    key={workshop._id}
                    className={`border rounded-xl p-5 transition-all hover:shadow-md ${isUpcoming
                      ? 'border-[#F2B988] bg-gradient-to-br from-white to-[#F2B988]/5'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#F25A38] to-[#F29057] rounded-lg flex flex-col items-center justify-center text-white shadow-md">
                            <span className="text-xs font-medium uppercase">{workshop.dayOfWeek?.substring(0, 3)}</span>
                            <span className="text-xl font-bold">{workshopDate.getDate()}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{workshop.title}</h3>
                            <p className="text-gray-600 mt-1 text-sm leading-relaxed">{workshop.description}</p>
                            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                📅 {workshopDate.toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                🕐 {workshopDate.toLocaleTimeString('fr-FR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            {workshop.createdBy && (
                              <p className="mt-2 text-xs text-gray-400">
                                Créé par: {workshop.createdBy.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleWorkshopEdit(workshop)}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                          title="Modifier cet atelier"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Modifier
                        </button>
                        <button
                          onClick={() => handleWorkshopDelete(workshop._id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                          title="Supprimer cet atelier"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/agenda/prochains-ateliers"
              className="inline-flex items-center text-sm text-[#F25A38] hover:text-[#E84A28] font-medium"
            >
              Voir la page publique des ateliers →
            </Link>
          </div>
        </div>

        {/* Workshop Registrations Section */}
        <div className="bg-white shadow rounded-lg p-6 mt-2 mb-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personnes inscrites aux ateliers</h2>
              <p className="text-gray-600 mt-1">Gérez les inscriptions reçues pour les ateliers</p>
            </div>
            <div className="text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-900">{registrations.length}</span> inscription{registrations.length !== 1 ? 's' : ''}
            </div>
          </div>

          {loadingRegistrations ? (
            <p className="text-gray-500 text-center py-8">Chargement des inscriptions...</p>
          ) : registrations.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">Aucune inscription pour le moment</p>
              <p className="text-gray-400 text-sm mt-2">Les inscriptions apparaîtront ici lorsque quelqu'un s'inscrit à un atelier</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Atelier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de l'atelier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inscrit le
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((registration) => {
                    const workshopDate = new Date(registration.workshopDate);
                    const registrationDate = new Date(registration.createdAt);
                    const isUpcoming = workshopDate > new Date();

                    return (
                      <tr key={registration._id} className={`hover:bg-gray-50 ${!isUpcoming ? 'opacity-60' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#F25A38] to-[#F29057] rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {registration.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                              <div className="text-sm text-gray-500">{registration.email}</div>
                              <div className="text-xs text-gray-400">{registration.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{registration.workshopTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {workshopDate.toLocaleDateString('fr-FR', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {workshopDate.toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={registration.status}
                            onChange={(e) => handleRegistrationStatusChange(registration._id, e.target.value)}
                            className="text-xs rounded-full px-3 py-1 font-semibold border-2 focus:outline-none focus:ring-2 focus:ring-[#F25A38] cursor-pointer"
                            style={{
                              backgroundColor: registration.status === 'confirmed' ? '#DEF7EC' : registration.status === 'cancelled' ? '#FDE8E8' : '#FEF3C7',
                              borderColor: registration.status === 'confirmed' ? '#84E1BC' : registration.status === 'cancelled' ? '#F98080' : '#FACA15',
                              color: registration.status === 'confirmed' ? '#03543F' : registration.status === 'cancelled' ? '#9B1C1C' : '#92400E'
                            }}
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmé</option>
                            <option value="cancelled">Annulé</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {registrationDate.toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRegistrationDelete(registration._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Supprimer cette inscription"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Users Management Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
            <Link
              href="/users"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Voir tous les utilisateurs
            </Link>
          </div>

          {loadingUsers ? (
            <p className="text-gray-500">Chargement des utilisateurs...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">Aucun utilisateur trouvé.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inscrit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.slice(0, 5).map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {u.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{u.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {u._id !== user?.id ? (
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="text-sm rounded-full px-3 py-1 font-semibold border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            style={{
                              backgroundColor: u.role === 'admin' ? '#EDE9FE' : '#DBEAFE',
                              borderColor: u.role === 'admin' ? '#A78BFA' : '#60A5FA',
                              color: u.role === 'admin' ? '#6D28D9' : '#1E40AF'
                            }}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span
                            className="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                            style={{
                              backgroundColor: u.role === 'admin' ? '#EDE9FE' : '#DBEAFE',
                              color: u.role === 'admin' ? '#6D28D9' : '#1E40AF'
                            }}
                          >
                            {u.role} (You)
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length > 5 && (
                <div className="mt-4 text-center">
                  <Link
                    href="/users"
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Voir tous les {users.length} utilisateurs →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
