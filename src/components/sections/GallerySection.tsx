import React from 'react';
import 'src/styles/components/gallery-section.css';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

type GalleryImages = GalleryImage[];

const GallerySection: React.FC<{ images?: GalleryImages }> = React.memo(({ images }) => {
  try {
    if (!images || images.length === 0) {
      return (
        <section className="py-12 bg-black text-white" aria-label="Gallery Section">
          <div className="container mx-auto text-center">
            <p className="font-roboto">No images available at the moment.</p>
          </div>
        </section>
      );
    }

    const sanitizedImages = images.map((image) => {
      try {
        new URL(image.src); // basic URL validation
        return { ...image };
      } catch (error) {
        console.error("Invalid image URL:", image.src);
        return {
          src: "/valorant-bot-landing/public/broken_image.svg",
          alt: `Broken Image - ${image.alt}`,
          caption: `Failed to load image: ${image.alt}`,
        };
      }
    });

    return (
      <section className="py-12 bg-black text-white" aria-label="Gallery Section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-exo-2 text-red-500">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sanitizedImages.map((image, index) => (
              <div key={index} className="relative rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover object-center"
                  loading="lazy"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-2">
                    <p className="text-white text-sm text-center font-roboto">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error rendering GallerySection:', error);
    return (
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto">
          <p className="text-center font-roboto">
            An error occurred while rendering the gallery. Please try again later.
          </p>
        </div>
      </section>
    );
  }
});

GallerySection.displayName = 'GallerySection';

export default React.memo(GallerySection);