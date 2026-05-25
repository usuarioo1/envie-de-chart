'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import WorkshopsSection from '@/components/dashboard/WorkshopsSection';
import AnimateursSection from '@/components/dashboard/AnimateursSection';
import StagesSection from '@/components/dashboard/StagesSection';
import UsersSection from '@/components/dashboard/UsersSection';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
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
              <div className="shrink-0">
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

        {/* Contact Messages Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Messages de Contact</h2>
              <p className="text-sm text-gray-600 mt-1">Gérez les messages reçus via le formulaire de contact</p>
            </div>
            <Link
              href="/dashboard/contact-messages"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F25A38] hover:bg-[#E84A28] transition-colors"
            >
              Voir les Messages →
            </Link>
          </div>
        </div>

        {/* Modular Components */}
        <WorkshopsSection userId={user?.id} />
        <AnimateursSection />
        <StagesSection />
        <UsersSection currentUserId={user?.id} />
      </div>
    </div>
  );
}
