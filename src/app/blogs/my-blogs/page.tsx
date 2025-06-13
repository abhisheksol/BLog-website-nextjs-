'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Layout from '../../../../components/Layout';
import { useAuth } from '../../../../contexts/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  desc: string;
  image: string;
  createdAt: string;
  likes: string[];
}

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [totalLikes, setTotalLikes] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        router.push('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/blogs/getByUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
        
        // Calculate total likes
        const likes = res.data.reduce((total: number, blog: Blog) => total + blog.likes.length, 0);
        setTotalLikes(likes);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [router]);

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const getPopularBlogs = () => {
    return [...blogs].sort((a, b) => b.likes.length - a.likes.length);
  };

  const getRecentBlogs = () => {
    return [...blogs].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const renderBlogs = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <motion.div 
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }

    if (!blogs.length) {
      return (
        <motion.div 
          className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Ready to share your story?</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Your blogging journey starts here. Create your first blog and connect with readers worldwide.</p>
            <Link href="/blogs/new" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create Your First Blog
            </Link>
          </motion.div>
        </motion.div>
      );
    }

    let blogsToShow = blogs;
    if (activeTab === 'popular') blogsToShow = getPopularBlogs();
    if (activeTab === 'recent') blogsToShow = getRecentBlogs();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {blogsToShow.map((blog, index) => (
          <motion.div 
            key={blog._id} 
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              {blog.image ? (
                <>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-gray-500 text-sm">No Image</p>
                  </div>
                </div>
              )}
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  href={`/blogs/edit/${blog._id}`}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </Link>
                <button 
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {blog.desc}
              </p>
              
              {/* Stats Row */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <div className="flex items-center space-x-1 text-pink-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm font-medium">{blog.likes.length}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <Link 
                href={`/blogs/${blog._id}`} 
                className="w-full block text-center py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600 hover:to-purple-600 text-blue-400 hover:text-white border border-blue-600/30 hover:border-transparent rounded-xl font-medium transition-all duration-300"
              >
                Read Article
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#111926]">
        {/* Modern Header with Enhanced Design */}
        <div className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-500/10 to-blue-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 container mx-auto max-w-7xl px-6 py-16">
            <motion.div 
              className="flex flex-col lg:flex-row items-center lg:items-start gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Avatar */}
              <motion.div 
                className="relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-gray-800 flex items-center justify-center text-4xl font-bold text-white">
                    {user?.username?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900"></div>
              </motion.div>
              
              {/* Enhanced User Info */}
              <div className="flex-1 text-center lg:text-left">
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {user?.username || 'User'}
                  </span>
                  <span className="text-white">'s Dashboard</span>
                </motion.h1>
                
                <motion.p 
                  className="text-gray-300 mb-8 max-w-2xl text-lg leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Transform your ideas into captivating stories. Manage your content, track engagement, and connect with your audience.
                </motion.p>
                
                {/* Enhanced Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{blogs.length}</div>
                    <div className="text-gray-400 text-sm font-medium">Published</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{totalLikes}</div>
                    <div className="text-gray-400 text-sm font-medium">Total Likes</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
                    <div className="text-3xl font-bold text-pink-400 mb-2">
                      {blogs.length > 0 ? Math.max(...blogs.map(blog => blog.likes.length)) : 0}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">Top Article</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced Action Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link 
                  href="/blogs/new" 
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  New Article
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Content Section */}
        <div className="container mx-auto max-w-7xl px-6 py-12">
          {/* Modern Tabs */}
          <motion.div 
            className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 mb-12 border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { id: 'all', label: 'All Articles', icon: '📚' },
              { id: 'popular', label: 'Most Popular', icon: '🔥' },
              { id: 'recent', label: 'Recent', icon: '⏰' }
            ].map((tab) => (
              <button 
                key={tab.id}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </motion.div>
          
          {/* Blog Grid */}
          {renderBlogs()}
        </div>
      </div>
    </Layout>
  );
}