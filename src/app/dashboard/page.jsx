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
  const [animateurs, setAnimateurs] = useState([]);
  const [stageInquiries, setStageInquiries] = useState([]);
  const [stages, setStages] = useState([]);
  const [stageRegistrations, setStageRegistrations] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [showAnimateurForm, setShowAnimateurForm] = useState(false);
  const [showStageForm, setShowStageForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [editingAnimateur, setEditingAnimateur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const [loadingAnimateurs, setLoadingAnimateurs] = useState(true);
  const [loadingStageInquiries, setLoadingStageInquiries] = useState(true);
  const [loadingStages, setLoadingStages] = useState(true);
  const [loadingStageRegistrations, setLoadingStageRegistrations] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [editingStage, setEditingStage] = useState(null);
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
  const [animateurFormData, setAnimateurFormData] = useState({
    name: '',
    country: '',
    phone: '',
    email: '',
    city: '',
    region: '',
    isActive: true
  });
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
    fetchAnimateurs();
    fetchStageInquiries();
    fetchStages();
    fetchStageRegistrations();
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

  const fetchAnimateurs = async () => {
    try {
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

  useEffect(() => {
    if (!loading) {
      setLoadingAnimateurs(true);
      fetchAnimateurs();
    }
  }, [selectedCountry]);

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

  // Animateurs handlers
  const handleAnimateurChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimateurFormData({
      ...animateurFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAnimateurSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const isEditing = editingAnimateur !== null;
      const method = isEditing ? 'PUT' : 'POST';
      const bodyData = isEditing
        ? { _id: editingAnimateur._id, ...animateurFormData }
        : animateurFormData;

      const response = await fetch('/api/animateurs', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditing ? '✅ Animateur modifié!' : '✅ Animateur créé!');
        setAnimateurFormData({
          name: '',
          country: '',
          phone: '',
          email: '',
          city: '',
          region: '',
          isActive: true
        });
        setShowAnimateurForm(false);
        setEditingAnimateur(null);
        fetchAnimateurs();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de l\'opération');
      }
    } catch (err) {
      setError('Une erreur s\'est produite.');
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
      isActive: true
    });
    setShowAnimateurForm(false);
  };

  const handleAnimateurDelete = async (animateurId) => {
    if (!confirm('⚠️ Supprimer cet animateur?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/animateurs?id=${animateurId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Animateur supprimé!');
        fetchAnimateurs();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la suppression');
      }
    } catch (err) {
      setError('Une erreur s\'est produite.');
    }
  };

  // Stage Inquiries Functions
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

  // Stages Functions
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
    setError('');
    setSuccess('');

    try {
      const isEditing = editingStage !== null;
      const method = isEditing ? 'PUT' : 'POST';
      const bodyData = isEditing
        ? { id: editingStage._id, ...stageFormData }
        : stageFormData;

      const response = await fetch('/api/stages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditing ? '✅ Stage modifié avec succès!' : '✅ Stage créé avec succès!');
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
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || `Échec de ${isEditing ? 'la modification' : 'la création'} du stage`);
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
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
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer ce stage?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/stages?id=${stageId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Stage supprimé avec succès!');
        fetchStages();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la suppression');
      }
    } catch (err) {
      setError('Une erreur s\'est produite.');
    }
  };

  const handleStageRegistrationDelete = async (registrationId) => {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette inscription?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/stage-registrations?id=${registrationId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Inscription supprimée avec succès!');
        fetchStageRegistrations();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la suppression');
      }
    } catch (err) {
      setError('Une erreur s\'est produite.');
    }
  };

  const handleStageRegistrationStatusChange = async (registrationId, newStatus) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/stage-registrations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: registrationId, status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`✅ Statut mis à jour: ${newStatus}!`);
        fetchStageRegistrations();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Échec de la mise à jour');
      }
    } catch (err) {
      setError('Une erreur s\'est produite.');
    }
  };

  const handleToggleInquiryRead = async (inquiryId, currentStatus) => {
    try {
      const response = await fetch('/api/stage-inquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: inquiryId, isRead: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        fetchStageInquiries();
      }
    } catch (err) {
      console.error('Error updating inquiry:', err);
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!confirm('⚠️ Supprimer cette demande?')) {
      return;
    }

    try {
      const response = await fetch(`/api/stage-inquiries?id=${inquiryId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Demande supprimée!');
        fetchStageInquiries();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Une erreur s\'est produite.');
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

        {/* Animateurs Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Animateurs</h2>
              <p className="text-sm text-gray-600 mt-1">Gérer les animateurs par pays</p>
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
          {loadingAnimateurs ? (
            <p className="text-gray-500 text-center py-8">Chargement...</p>
          ) : animateurs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Aucun animateur trouvé</p>
            </div>
          ) : (
            <div className="space-y-4">
              {animateurs.map((animateur) => (
                <div
                  key={animateur._id}
                  className={`border rounded-xl p-5 hover:shadow-md transition-all ${
                    animateur.isActive ? 'border-indigo-200 bg-indigo-50/50' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {animateur.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{animateur.name}</h3>
                          {!animateur.isActive && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full mt-1">
                              Inactif
                            </span>
                          )}
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <p><strong>Pays:</strong> {animateur.country}</p>
                            {animateur.city && <p><strong>Ville:</strong> {animateur.city}</p>}
                            {animateur.phone && <p><strong>Tél:</strong> {animateur.phone}</p>}
                            {animateur.email && <p><strong>Email:</strong> {animateur.email}</p>}
                            {animateur.region && <p><strong>Région:</strong> {animateur.region}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <button
                        onClick={() => handleAnimateurEdit(animateur)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleAnimateurDelete(animateur._id)}
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

        {/* Stages Section */}
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
            <form onSubmit={handleStageSubmit} className="mb-8 p-6 bg-gradient-to-br from-[#F2B988]/10 to-[#ABA0F2]/10 rounded-xl border border-[#F2B988]/30 space-y-4">
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
                    Formatrice
                  </label>
                  <input
                    type="text"
                    name="formatrice"
                    value={stageFormData.formatrice}
                    onChange={handleStageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                    placeholder="Marie-Laure Potel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email de contact <span className="text-red-500">*</span>
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
                    placeholder="01 23 45 67 89"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du contact
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={stageFormData.contact?.name || ''}
                    onChange={handleStageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29057]"
                    placeholder="Marie-Laure Potel"
                  />
                </div>
              </div>

              <div>
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
                  placeholder="Décrivez le stage..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#F29057] text-white font-medium rounded-lg hover:bg-[#F25A38]"
                >
                  {editingStage ? 'Mettre à jour' : 'Créer le stage'}
                </button>
                {editingStage && (
                  <button
                    type="button"
                    onClick={handleStageCancelEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    Annuler l'édition
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
              <p className="text-gray-500">Aucun stage créé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stages.map((stage) => (
                <div key={stage._id} className="border border-slate-200 rounded-lg p-4 bg-white/70 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
                  {stage.country && <p className="text-xs text-rose-400 uppercase">{stage.country}</p>}
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>📅 {stage.date}</p>
                    <p>📍 {stage.location}</p>
                    {stage.formatrice && <p>👤 {stage.formatrice}</p>}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{stage.description.substring(0, 100)}...</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleStageEdit(stage)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      ✏️ Modificar
                    </button>
                    <button
                      onClick={() => handleStageDelete(stage._id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stage Registrations Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Inscriptions à Stages et Formations</h2>
              <p className="text-sm text-gray-600 mt-1">Gérez les inscriptions reçues</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              {stageRegistrations.filter(r => r.status === 'pending').length} en attente
            </span>
          </div>

          {loadingStageRegistrations ? (
            <p className="text-gray-500 text-center py-8">Chargement...</p>
          ) : stageRegistrations.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Aucune inscription</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stageRegistrations.map((registration) => (
                <div key={registration._id} className={`border rounded-lg p-4 ${
                  registration.status === 'pending' ? 'bg-orange-50 border-orange-300' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#F25A38] text-white">
                          {registration.stageTitle}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          registration.status === 'pending' ? 'bg-orange-500 text-white' :
                          registration.status === 'confirmed' ? 'bg-green-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {registration.status === 'pending' ? '⏳ En attente' : 
                           registration.status === 'confirmed' ? '✅ Confirmé' : '❌ Annulé'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nom</p>
                          <p className="font-medium text-gray-900">{registration.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${registration.email}`} className="font-medium text-blue-600 hover:underline">
                            {registration.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <a href={`tel:${registration.phone}`} className="font-medium text-blue-600 hover:underline">
                            {registration.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date du stage</p>
                          <p className="font-medium text-gray-900">{registration.stageDate}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Inscrit le {new Date(registration.createdAt).toLocaleDateString('fr-FR')}
                      </p>
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
              ))}
            </div>
          )}
        </div>

        {/* Solicitudes de Información de Formaciones */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              📋 Demandes d'Information - Stages et Formations
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              {stageInquiries.filter(i => !i.isRead).length} non lues
            </span>
          </div>

          {loadingStageInquiries ? (
            <p className="text-gray-500 text-center py-8">Chargement...</p>
          ) : stageInquiries.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Aucune demande d'information</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stageInquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className={`border rounded-lg p-4 ${
                    inquiry.isRead ? 'bg-gray-50 border-gray-200' : 'bg-orange-50 border-orange-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                          Formation {inquiry.formationNumber}
                        </span>
                        {!inquiry.isRead && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                            Nouveau
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {inquiry.formationTitle}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Nom</p>
                          <p className="font-medium text-gray-900">{inquiry.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${inquiry.email}`} className="font-medium text-blue-600 hover:underline">
                            {inquiry.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <a href={`tel:${inquiry.phone}`} className="font-medium text-blue-600 hover:underline">
                            {inquiry.phone}
                          </a>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        Reçu le {new Date(inquiry.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div className="ml-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleToggleInquiryRead(inquiry._id, inquiry.isRead)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          inquiry.isRead
                            ? 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                            : 'text-white bg-green-600 hover:bg-green-700'
                        }`}
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
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
