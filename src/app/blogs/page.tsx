'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import BlogCard from '../../../components/BlogCard';
import { getAllBlogs } from '../../../utils/api';
import { Blog } from '../../../types';
import { FiSearch, FiGrid, FiList, FiTrendingUp, FiClock, FiFilter, FiX } from 'react-icons/fi';

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

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen pb-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Discover Amazing Stories</h1>
              <p className="text-lg text-blue-100 mb-8">Explore our collection of thought-provoking articles written by our community of passionate writers.</p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-8">
          {/* Featured Blogs Section */}
          {!loading && !error && featuredBlogs.length > 0 && !searchQuery && !activeTag && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Featured Blogs</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredBlogs.map(blog => (
                  <div key={blog._id} className="bg-blue-600 bg-opacity-10 backdrop-blur-sm rounded-xl p-1 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20">
                    <BlogCard 
                      blog={blog} 
                      refreshBlogs={fetchBlogs}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Filters and Controls */}
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between sticky top-20 z-10 border border-gray-700">
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
          </div>
          
          {/* Content Section */}
          <div className="relative">
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
            
            {/* Blog Grid */}
            {!loading && !error && filteredBlogs.length > 0 && (
              <>
                <div className={viewMode === 'grid' ? 
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
                  'space-y-6'
                }>
                  {filteredBlogs.map(blog => (
                    <div 
                      key={blog._id} 
                      className={`transform transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 ${
                        viewMode === 'list' ? 'border border-gray-700 rounded-xl overflow-hidden' : ''
                      }`}
                    >
                      <BlogCard 
                        blog={blog} 
                        refreshBlogs={fetchBlogs}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Results Count */}
                <div className="mt-8 text-center text-sm text-gray-400">
                  Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}
                  {(searchQuery || activeTag) && ' matching your filters'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}