'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroImage from '@/assets/unnamed.png';
import image12 from '@/assets/WhatsApp Image 2026-01-21 at 6.35.14 AM.jpeg';  


export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [heroImage, image12];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000); // Cambia cada 6 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative w-full h-0 pb-[40%] overflow-hidden mb-12">
            {/* Aspect ratio más panorámico (2.5:1) para menos altura */}
            <div className="absolute inset-0">
                {/* Imagen de fondo */}
                <Image
                    src={images[currentImage]}
                    alt="Envie de Chanter - Chant prénatal et psychophonie"
                    fill
                    priority
                    className="object-cover object-center transition-opacity duration-1000"
                    quality={90}
                />

                {/* Overlay con opacidad */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#732514]/60 via-[#F25A38]/40 to-[#F29057]/50"></div>

                {/* Contenido del Hero */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
                        Envie de Chanter
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-2xl text-white/95 font-light max-w-3xl drop-shadow-lg">
                        Le chant prénatal et la psychophonie au service du bien-être
                    </p>

                    {/* Línea decorativa */}
                    <div className="mt-8 w-24 h-1 bg-[#F2B988] rounded-full shadow-lg"></div>
                </div>
            </div>
        </section>
    );
}
