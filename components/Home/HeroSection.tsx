'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Mobile layout (stacked) with image in middle */}
      <div className="w-full lg:hidden flex flex-col items-center">
        {/* Image container - positioned in the middle for mobile */}
        <motion.div
          className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-2xl scale-110"></div>
          
          {/* Floating elements around image */}
          <motion.div 
            className="absolute -top-16 -left-12 w-16 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-lg z-10"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="p-2">
              <div className="w-2 h-2 bg-white rounded-full mb-1"></div>
              <div className="space-y-1">
                <div className="w-8 h-1 bg-white/80 rounded"></div>
                <div className="w-6 h-1 bg-white/60 rounded"></div>
                <div className="w-7 h-1 bg-white/40 rounded"></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -top-8 -right-16 w-20 h-14 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg shadow-xl z-10"
            animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-full h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="p-1">
              <div className="w-full h-4 bg-blue-500/20 rounded"></div>
            </div>
          </motion.div>

          {/* Profile image */}
          <img 
            src="https://i.ibb.co/39kdrjrg/abhi.jpg" 
            alt="Abhishek" 
            className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
          />
          
          {/* Orbiting elements */}
          <motion.div 
            className="absolute top-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "8px 150px" }}
          />
          
          <motion.div 
            className="absolute bottom-8 left-8 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg"
            animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          <motion.div 
            className="absolute top-0 right-8 w-3 h-3 bg-green-400 rounded-full shadow-lg"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "-100px 100px" }}
          />
        </motion.div>
        
        {/* Title and text below image on mobile */}
        <motion.div
          className="text-center px-4 max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-white block mb-2">Inspiration</span>
            <span className="text-white block">is everywhere</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            There is no passion to be found playing small in settling for a life that is less than the one you are capable of living.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link 
              href="/blogs" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get started
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop layout - side-by-side with text on left */}
      <div className="hidden lg:flex lg:flex-row items-center gap-16">
        {/* Left side - Text Content */}
        <motion.div 
          className="w-1/2 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white block mb-2">Inspiration</span>
            <span className="text-white block">is everywhere</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            There is no passion to be found playing small in settling for a life that is less than the one you are capable of living.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link 
              href="/blogs" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get started
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Right side - Image with floating elements */}
        <motion.div 
          className="w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Floating clipboard/note element - top left */}
            <motion.div 
              className="absolute -top-16 -left-12 w-16 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-lg z-10"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-2">
                <div className="w-2 h-2 bg-white rounded-full mb-1"></div>
                <div className="space-y-1">
                  <div className="w-8 h-1 bg-white/80 rounded"></div>
                  <div className="w-6 h-1 bg-white/60 rounded"></div>
                  <div className="w-7 h-1 bg-white/40 rounded"></div>
                </div>
              </div>
            </motion.div>

            {/* Floating laptop element - top right */}
            <motion.div 
              className="absolute -top-8 -right-16 w-20 h-14 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg shadow-xl z-10"
              animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-full h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg"></div>
              <div className="p-1">
                <div className="w-full h-4 bg-blue-500/20 rounded"></div>
              </div>
            </motion.div>

            {/* Main image container */}
            <motion.div 
              className="relative w-80 h-80 lg:w-96 lg:h-96"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-2xl scale-110"></div>
              
              {/* Profile image */}
              <img 
                src="https://i.ibb.co/39kdrjrg/abhi.jpg" 
                alt="Abhishek" 
                className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
              />
              
              {/* Orbiting elements */}
              <motion.div 
                className="absolute top-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "8px 200px" }}
              />
              
              <motion.div 
                className="absolute top-0 left-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "6px 180px" }}
              />
            </motion.div>

            {/* Additional floating elements */}
            <motion.div 
              className="absolute bottom-8 left-8 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg"
              animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
