'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="relative mb-6" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {/* Animated heading with continuous effects */}
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
                  {/* First line with floating animation for each character */}
                  <div className="inline-block">
                    {"Share Your Story".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block text-white"
                        animate={{ 
                          y: [0, char === " " ? 0 : -8, 0],
                          scale: [1, char === " " ? 1 : 1.1, 1],
                          color: [
                            "rgb(255, 255, 255)",
                            char === " " ? "rgb(255, 255, 255)" : "rgb(147, 197, 253)", // blue-300
                            "rgb(255, 255, 255)"
                          ]
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          delay: index * 0.05,
                          ease: "easeInOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  
                  <br />
                  
                  {/* Second line with animated gradient and glow effect */}
                  <motion.span 
                    className="bg-clip-text text-transparent relative inline-block"
                    style={{ 
                      backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #8b5cf6, #3b82f6)"
                    }}
                    animate={{ 
                      backgroundPosition: ["0% center", "100% center", "0% center"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop"
                    }}
                  >
                    With the World
                    
                    {/* Animated glow effect */}
                    <motion.span
                      className="absolute -inset-1 rounded-lg opacity-30 blur-xl -z-10"
                      style={{ 
                        backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #8b5cf6, #3b82f6)",
                        filter: "blur(20px)"
                      }}
                      animate={{ 
                        backgroundPosition: ["0% center", "100% center", "0% center"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                    />
                  </motion.span>
                  
                  {/* Subtle accent dot at the end */}
                  <motion.span
                    className="text-blue-400 ml-1 inline-block"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    .
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Express your ideas, share your experiences, and connect with a community of writers and readers passionate about great content.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {user ? (
                  <Link href="/blogs/new" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition duration-300">
                    <span>Create a Blog</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition duration-300">
                      <span>Get Started</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link href="/register" className="inline-flex items-center px-8 py-4 rounded-full bg-gray-800 text-gray-200 border border-gray-700 font-medium shadow hover:bg-gray-700 transform hover:-translate-y-1 transition duration-300">
                      <span>Create Account</span>
                    </Link>
                  </>
                )}
                <Link href="/blogs" className="inline-flex items-center px-8 py-4 rounded-full bg-gray-800 text-gray-200 border border-gray-700 font-medium shadow hover:bg-gray-700 transform hover:-translate-y-1 transition duration-300">
                  <span>Browse Blogs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Hero Image - adding a filter to make it work with dark theme */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mx-auto max-w-md">
                {/* Prismatic orbiting particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="prism-particle particle-1"></div>
                  <div className="prism-particle particle-2"></div>
                  <div className="prism-particle particle-3"></div>
                  <div className="prism-particle particle-4"></div>
                  <div className="prism-particle particle-5"></div>
                  <div className="prism-particle particle-6"></div>
                </div>

                {/* Crystal refraction layer */}
                <div className="crystal-refraction absolute inset-0 z-0"></div>
                
                {/* Interactive aurora effect */}
                <div className="absolute inset-0 aurora-container z-0"></div>
                
                {/* Magnetic liquid simulation */}
                <div className="absolute inset-0 liquid-magnetic-effect z-0"></div>
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 holographic-overlay z-0"></div>
                
                {/* Decorative elements - keep existing ones */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-xl opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Water animation background blob */}
                <div 
                  className="absolute inset-0 -m-4 opacity-40 blur-2xl animate-blob-slow"
                  style={{
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  }}
                ></div>
                
                {/* Second layer with different timing */}
                <div 
                  className="absolute inset-0 -m-4 opacity-30 blur-xl animate-blob-medium"
                  style={{
                    background: 'linear-gradient(to right, #4f46e5, #8b5cf6)',
                    borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
                    animationDelay: '2s',
                  }}
                ></div>
                
                {/* Third layer with different timing */}
                <div 
                  className="absolute inset-0 -m-4 opacity-30 blur-xl animate-blob-fast"
                  style={{
                    background: 'linear-gradient(to right, #6366f1, #a855f7)',
                    borderRadius: '70% 30% 50% 50% / 30% 40% 60% 70%',
                    animationDelay: '4s',
                  }}
                ></div>
                
                {/* Image with animated blob shape */}
                <div 
                  className="relative p-1 overflow-hidden shadow-lg shadow-blue-900/40 animate-border"
                  style={{
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  }}
                >
                  <img 
                    src="https://i.ibb.co/39kdrjrg/abhi.jpg" 
                    alt="Blog illustration" 
                    className="w-full h-auto object-cover filter brightness-90 contrast-125 animate-border-mask"
                    style={{
                      borderRadius: 'inherit',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Features Section */}
          <motion.div 
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Easy Writing",
                description: "Write and publish your thoughts with our intuitive editor."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                ),
                title: "Growing Community",
                description: "Connect with readers and writers who share your interests."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Powerful Tools",
                description: "Customize your blog with powerful formatting and media tools."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-blue-900/20 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-700">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}