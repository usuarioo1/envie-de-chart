'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UsersSection({ currentUserId }) {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

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

    const handleRoleChange = async (userId, newRole) => {
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
                fetchUsers();
            }
        } catch (err) {
            console.error('Error updating role:', err);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
                    <p className="text-sm text-gray-600 mt-1">Gérez les rôles et permissions des utilisateurs</p>
                </div>
                <Link
                    href="/users"
                    className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                    Voir tous les utilisateurs →
                </Link>
            </div>

            {loadingUsers ? (
                <p className="text-gray-500 text-center py-8">Chargement des utilisateurs...</p>
            ) : users.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Aucun utilisateur trouvé</p>
                </div>
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
                                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
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
                                        {u._id !== currentUserId ? (
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                className="text-sm rounded-full px-3 py-1 font-semibold border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors"
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
                                                {u.role} (Vous)
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length > 5 && (
                        <div className="mt-4 text-center">
                            <Link
                                href="/users"
                                className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                            >
                                Voir les {users.length - 5} autres utilisateurs →
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
