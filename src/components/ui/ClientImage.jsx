'use client';

export default function ClientImage({ src, alt, className }) {
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/800x500/001a4d/ffffff?text=ThePoliticst';
  };

  return (
    <img 
      src={src || 'https://placehold.co/800x500/001a4d/ffffff?text=ThePoliticst'} 
      alt={alt} 
      className={className}
      onError={handleImageError}
    />
  );
}
