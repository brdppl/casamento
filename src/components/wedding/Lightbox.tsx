import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';

const Lightbox = ({
  photos,
  selectedIndex,
  setSelectedIndex,
}: {
  photos: { id: number; path: string; label: string }[];
  selectedIndex: number | null;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
}) => {
  const closePhoto = () => setSelectedIndex(null);
  const prevPhoto = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null,
    );
  const nextPhoto = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null,
    );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') closePhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={closePhoto}
        >
          {/* Close button */}
          <button
            onClick={closePhoto}
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 md:left-8 p-2 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Photo content */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9, x: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (Math.abs(info.offset.x) > 50) {
                if (info.offset.x > 0) prevPhoto();
                else nextPhoto();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-[85vw] max-w-lg aspect-[3/4] bg-transparent rounded-sm flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <Image
              src={photos[selectedIndex].path}
              alt={`Foto ${photos[selectedIndex].id}`}
              width="400"
              height="400"
            />
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 md:right-8 p-2 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute bg-secondary/60 backdrop-blur-md py-2 px-4 rounded-2xl bottom-6 left-1/2 -translate-x-1/2 font-sans-elegant text-xs tracking-widest uppercase text-muted-foreground">
            {selectedIndex + 1} / {photos.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
