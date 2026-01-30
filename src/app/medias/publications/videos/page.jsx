'use client';

import { useState } from 'react';
import videosData from '@/utils/medias/videos.json';

export default function VideosPage() {
    const [videos, setVideos] = useState(videosData.videos);
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    const handleTitleChange = (videoId) => {
        setVideos(videos.map(v =>
            v.id === videoId ? { ...v, title: editingTitle } : v
        ));
        setEditingId(null);
    };

    const startEditing = (video) => {
        setEditingId(video.id);
        setEditingTitle(video.title);
    };

    const getVideoThumbnail = (video) => {
        if (video.type === 'youtube') {
            return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
        } else if (video.type === 'dailymotion') {
            return `https://cdn.dailymotion.com/thumb/video/${video.videoId}.jpg`;
        }
        return null;
    };

    const getEmbedUrl = (video) => {
        if (video.type === 'youtube') {
            return `https://www.youtube.com/embed/${video.videoId}`;
        } else if (video.type === 'dailymotion') {
            return `https://www.dailymotion.com/embed/video/${video.videoId}`;
        }
        return null;
    };

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-3 text-slate-900">
                    {videosData.title}
                </h1>
                <p className="text-lg text-slate-600 mb-10">{videosData.subtitle}</p>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white border border-[#F2B988]"
                        >
                            {/* Video Preview */}
                            <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                                {video.type === 'video' ? (
                                    <video
                                        src={video.url}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={getVideoThumbnail(video)}
                                            alt={video.title || `Video ${video.id}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                                            <svg
                                                className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="p-4">
                                {editingId === video.id ? (
                                    <div className="space-y-2 mb-4">
                                        <input
                                            type="text"
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            placeholder="Agregar título..."
                                            className="w-full px-3 py-2 border border-[#F2B988] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25A38]"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleTitleChange(video.id)}
                                                className="flex-1 px-3 py-1 bg-[#F25A38] text-white rounded-lg hover:bg-[#E84A28] transition-colors text-sm"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="flex-1 px-3 py-1 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {video.title ? (
                                            <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">
                                                {video.title}
                                            </h3>
                                        ) : (
                                            <p className="text-slate-500 italic mb-3 text-sm">
                                                Sin título asignado
                                            </p>
                                        )}
                                    </>
                                )}

                                {editingId !== video.id && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditing(video)}
                                            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                                        >
                                            Editar
                                        </button>
                                        <a
                                            href={video.type === 'video' ? video.url : getEmbedUrl(video)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-4 py-2 bg-[#F25A38] text-white rounded-lg hover:bg-[#E84A28] transition-colors text-sm font-medium flex items-center justify-center"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Ver
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Video Source Badge */}
                            <div className="px-4 pb-4">
                                <span className="inline-block px-3 py-1 bg-[#F2B988]/20 text-[#F25A38] rounded-full text-xs font-semibold">
                                    {video.type === 'youtube' && 'YouTube'}
                                    {video.type === 'dailymotion' && 'Dailymotion'}
                                    {video.type === 'video' && 'Video'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
