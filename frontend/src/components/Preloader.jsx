import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcheraLogo from './ArcheraLogo';

export default function Preloader({ onComplete, minDuration = 1400 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="archera-preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none"
          style={{ background: '#F5F2EB' }}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo Monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4"
          >
            <ArcheraLogo size={46} />
          </motion.div>

          {/* Center Brand Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-center mb-5"
          >
            <h1
              className="text-2xl md:text-3xl font-normal tracking-[0.28em] text-[#1A1A1A]"
              style={{ fontFamily: "'Yeseva One', Georgia, serif" }}
            >
              ARCHERA
            </h1>
            <span
              className="block text-[10px] tracking-[0.45em] text-[#C5A059] font-bold uppercase mt-1"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              REAL ESTATES
            </span>
          </motion.div>

          {/* Fast Loading Line (Progress Bar) */}
          <div className="w-36 h-[3px] bg-[rgba(44,30,22,0.12)] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-[#C5A059] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.25, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
