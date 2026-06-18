'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroImg from '@/assets/fotoHero.jpeg'


export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [HeroImg];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000); // Cambia cada 6 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative w-full h-0 pb-[50%] overflow-hidden mb-12">
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
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 mt-8 md:mt-0 drop-shadow-2xl">
                        <span className="block">Envie de Chanter</span>
                        <span className="mt-2 block text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold">
                            Chant prénatal et psychophonie
                        </span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/95 font-light max-w-3xl drop-shadow-lg">
                        Ateliers, stages et formations autour de la voix, du corps et du bien-être.
                    </p>

                    <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
                        <Link
                            href="/agenda/calendrier"
                            className="rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#732514] shadow-lg transition hover:bg-[#F2B988]"
                        >
                            Voir le calendrier
                        </Link>
                        <Link
                            href="/chant-prenatal/le-chant-prenatal-psychophonie"
                            className="rounded-full border border-white/80 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg transition hover:bg-white/20"
                        >
                            Découvrir le chant prénatal
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
