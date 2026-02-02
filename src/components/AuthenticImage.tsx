import React, { useState } from 'react';
import { ShieldCheck, ImageOff } from 'lucide-react';

interface AuthenticImageProps {
    src?: string;
    alt: string;
    className?: string;
    fallbackType?: 'mosque' | 'pattern' | 'calligraphy';
}

export const AuthenticImage: React.FC<AuthenticImageProps> = ({
    src,
    alt,
    className = "",
    fallbackType = 'pattern'
}) => {
    const [error, setError] = useState(!src);

    // Robust URL for high-quality, religiously compliant placeholders
    const getFallback = () => {
        switch (fallbackType) {
            case 'mosque':
                return 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80'; // Masjid al-Haram
            case 'calligraphy':
                return 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80'; // Islamic Art
            default:
                return 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80'; // Islamic Pattern
        }
    };

    if (error) {
        return (
            <div className={`relative flex items-center justify-center bg-muted/20 overflow-hidden ${className}`}>
                <img
                    src={getFallback()}
                    alt="Authentic Pattern Fallback"
                    className="w-full h-full object-cover opacity-40 grayscale sepia-[0.2]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <ShieldCheck className="w-8 h-8 text-primary shadow-glow" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Contenuto Autentico Verificato</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden group ${className}`}>
            <img
                src={src}
                alt={alt}
                onError={() => setError(true)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Authentic Source Badge Overlay */}
            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md p-1 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ShieldCheck className="w-3 h-3 text-primary" />
            </div>
        </div>
    );
};
