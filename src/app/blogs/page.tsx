'use client';

import React, { useEffect, useState, useRef } from 'react';
import Layout from '../../../components/Layout';
import BlogCard from '../../../components/BlogCard';
import { getAllBlogs } from '../../../utils/api';
import { Blog } from '../../../types';
import { FiSearch, FiGrid, FiList, FiTrendingUp, FiClock, FiFilter, FiX } from 'react-icons/fi';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
      setFilteredBlogs(data);
      setError('');
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...blogs];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tag
    if (activeTag) {
      result = result.filter(blog => 
        blog.tags?.includes(activeTag) || false
      );
    }
    
    // Apply sorting
    if (sortBy === 'trending') {
      result.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setFilteredBlogs(result);
  }, [blogs, searchQuery, sortBy, activeTag]);

  // Extract unique tags from blogs
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));
  
  // Get featured blogs (most liked)
  const featuredBlogs = [...blogs].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, 3);

  // For page transition and parallax effects
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100]);
  const opacityBg = useTransform(scrollY, [0, 200], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  useEffect(() => {
    // Trigger the entrance animation after a small delay
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <motion.div 
        className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen pb-16"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Floating particles effect */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-blue-500 opacity-10"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: [0.5, Math.random() + 0.5, 0.5],
                opacity: [0.1, Math.random() * 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Hero Section with Parallax */}
        <motion.div 
          ref={heroRef}
          style={{ opacity: opacityBg }}
          className="relative bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden"
        >
          {/* Parallax moving background */}
          <motion.div 
            style={{ y: parallaxY, scale }} 
            className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
          ></motion.div>
          
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              {/* Animated heading with continuous effects */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 relative"
              >
                {/* 3D rotating cube effect behind the title */}
                <div className="perspective-1000 absolute inset-0 flex justify-center items-center">
                  <motion.div
                    className="w-64 h-64 opacity-10"
                    animate={{ 
                      rotateX: [0, 360], 
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-500 rounded-lg filter blur-2xl"></div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-500 filter blur-3xl opacity-20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
                
                <motion.div 
                  className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-purple-500 filter blur-3xl opacity-20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ 
                    duration: 4,
                    delay: 1, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
                
                {/* Enhanced main title with 3D hover */}
                <h1 className="text-4xl md:text-5xl font-bold relative inline-block perspective-1000 z-10">
                  {["Discover", "Amazing", "Stories"].map((word, wordIndex) => (
                    <motion.span 
                      key={wordIndex} 
                      className="inline-block mr-4 cursor-default"
                      whileHover={{ 
                        rotateY: [0, 15, 0], 
                        scale: 1.05,
                        color: "#60a5fa",
                        transition: { duration: 0.8 }
                      }}
                    >
                      {word.split("").map((char, charIndex) => (
                        <motion.span 
                          key={`${wordIndex}-${charIndex}`}
                          className="inline-block text-white"
                          animate={{ 
                            y: [0, -5, 0],
                            color: [
                              "rgb(255, 255, 255)",
                              "rgb(147, 197, 253)", // blue-300
                              "rgb(255, 255, 255)"
                            ]
                          }}
                          transition={{ 
                            duration: 3,
                            delay: charIndex * 0.05 + wordIndex * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {" "}
                    </motion.span>
                  ))}
                </h1>
                
                {/* Upgraded underline animation */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mt-3 mx-auto relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-50"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Animated subtitle */}
              <motion.p
                className="text-lg text-blue-100 mb-8"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  y: [2, 0, 2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                Explore our collection of thought-provoking articles written by our community of passionate writers.
              </motion.p>
              
              {/* Enhanced search bar */}
              <motion.div 
                className="relative max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform focus:scale-[1.02] duration-300"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                )}
                
                {/* Search pulse effect */}
                <motion.div 
                  className="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none"
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Content container with staggered animations */}
        <motion.div 
          className="container mx-auto px-4 -mt-8 relative z-10"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {/* Featured Blogs Section */}
          {!loading && !error && featuredBlogs.length > 0 && !searchQuery && !activeTag && (
            <motion.div 
              className="mb-12"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2 
                  className="text-2xl font-bold text-white relative inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Featured Blogs
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredBlogs.map((blog, index) => (
                  <motion.div 
                    key={blog._id} 
                    className="bg-blue-600 bg-opacity-10 backdrop-blur-sm rounded-xl p-1 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20"
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { 
                        y: 0, 
                        opacity: 1,
                        transition: { delay: index * 0.1 }
                      }
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <BlogCard 
                      blog={blog} 
                      refreshBlogs={fetchBlogs}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Filters and Controls with glass effect */}
          <motion.div 
            className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between sticky top-20 z-10 border border-gray-700"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ boxShadow: "0 8px 30px rgba(37, 99, 235, 0.2)" }}
          >
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-300"><FiFilter /></span>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveTag(null)} 
                  className={`px-3 py-1 rounded-full text-sm ${!activeTag ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  All
                </button>
                {allTags.slice(0, 5).map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`px-3 py-1 rounded-full text-sm ${tag === activeTag ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setSortBy('recent')} 
                  className={`flex items-center px-3 py-2 ${sortBy === 'recent' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FiClock className="mr-2" />
                  <span className="text-sm">Recent</span>
                </button>
                <button 
                  onClick={() => setSortBy('trending')} 
                  className={`flex items-center px-3 py-2 ${sortBy === 'trending' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FiTrendingUp className="mr-2" />
                  <span className="text-sm">Popular</span>
                </button>
              </div>
              
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FiGrid />
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Content Section */}
          <motion.div 
            className="relative"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-700"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                      <div className="flex justify-between mt-6">
                        <div className="h-10 bg-gray-700 rounded w-1/3"></div>
                        <div className="h-10 bg-gray-700 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-6 py-8 rounded-xl text-center">
                <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Failed to load blogs</h3>
                <p>{error}</p>
                <button 
                  onClick={fetchBlogs}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && !error && filteredBlogs.length === 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">No blogs found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {searchQuery || activeTag ? 
                    `We couldn't find any articles matching your search criteria. Try adjusting your filters or search query.` : 
                    `There are no blog posts published yet. Check back soon for new content!`
                  }
                </p>
                {(searchQuery || activeTag) && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTag(null);
                    }}
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
            
            {/* Blog Grid with improved transitions */}
            {!loading && !error && filteredBlogs.length > 0 && (
              <div>
                <div className={viewMode === 'grid' ? 
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
                  'space-y-6'
                }>
                  {filteredBlogs.map((blog, index) => (
                    <motion.div 
                      key={blog._id} 
                      className={`transform transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 ${
                        viewMode === 'list' ? 'border border-gray-700 rounded-xl overflow-hidden' : ''
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.05 }
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <BlogCard 
                        blog={blog} 
                        refreshBlogs={fetchBlogs}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Results Count */}
                <motion.div 
                  className="mt-8 text-center text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}
                  {(searchQuery || activeTag) && ' matching your filters'}
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}