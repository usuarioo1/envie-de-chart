'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import image1 from '@/assets/WhatsApp Image 2026-01-16 at 5.11.47 PM.jpeg';
import image2 from '@/assets/WhatsApp Image 2026-01-16 at 5.12.02 PM.jpeg';
import image3 from '@/assets/WhatsApp Image 2026-01-16 at 5.14.04 PM.jpeg';
import image5 from '@/assets/WhatsApp Image 2026-01-16 at 5.15.16 PM.jpeg';
import image6 from '@/assets/WhatsApp Image 2026-01-16 at 5.18.54 PM.jpeg';
import image7 from '@/assets/WhatsApp Image 2026-01-16 at 5.19.55 PM.jpeg';
import image8 from '@/assets/WhatsApp Image 2026-01-16 at 5.21.10 PM.jpeg';
import image9 from '@/assets/WhatsApp Image 2026-01-16 at 5.21.22 PM.jpeg';
import image10 from '@/assets/WhatsApp Image 2026-01-16 at 5.24.05 PM.jpeg';
import image11 from '@/assets/IMG_0724.jpeg';
import image12 from '@/assets/WhatsApp Image 2026-01-21 at 6.35.14 AM.jpeg';  
import image13 from '@/assets/WhatsApp Image 2026-01-22 at 4.41.08 PM.jpeg'

const images = [
  image1, image2, image3, image5,
  image6, image7, image8, image9, image10, image11, image12, image13
];

export default function CarouselCollage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      {/* Título */}
      

      <div className="relative w-full grid lg:grid-cols-[2fr_1fr] grid-cols-1 gap-4 min-h-[600px]">
        {/* Imagen principal */}
        <div className="relative w-full h-full min-h-[600px] lg:min-h-[600px] min-h-[400px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Collage de miniaturas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2.5 h-fit max-h-[600px] overflow-y-auto">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative w-full h-[120px] md:h-[80px] lg:h-[120px] rounded-xl overflow-hidden cursor-pointer border-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg ${index === currentIndex
                ? 'border-[#F25A38] shadow-[#F25A38]/50'
                : 'border-transparent'
                }`}
              onClick={() => goToSlide(index)}
            >
              <Image
                src={img}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Controles */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 -translate-y-1/2 left-5 md:left-2.5 bg-white/90 hover:bg-[#F2B988] text-[#732514] hover:text-white border-0 w-[50px] h-[50px] md:w-[40px] md:h-[40px] rounded-full text-3xl md:text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-lg"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 -translate-y-1/2 right-5 md:right-2.5 bg-white/90 hover:bg-[#F2B988] text-[#732514] hover:text-white border-0 w-[50px] h-[50px] md:w-[40px] md:h-[40px] rounded-full text-3xl md:text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-lg"
          aria-label="Siguiente"
        >
          ›
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full border-2 border-white cursor-pointer transition-all duration-300 hover:bg-white/80 hover:scale-110 ${index === currentIndex
                ? 'bg-white w-[30px] rounded-md'
                : 'bg-white/50 w-3'
                }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
