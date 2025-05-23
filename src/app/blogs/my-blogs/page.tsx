'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Layout from '../../../../components/Layout';
import { useAuth } from '../../../../contexts/AuthContext';
import Link from 'next/link';

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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!blogs.length) {
      return (
        <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
          <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">No blogs yet</h3>
          <p className="text-gray-400 mb-6">Start sharing your thoughts with the world.</p>
          <Link href="/blogs/new" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Create Your First Blog
          </Link>
        </div>
      );
    }

    let blogsToShow = blogs;
    if (activeTab === 'popular') blogsToShow = getPopularBlogs();
    if (activeTab === 'recent') blogsToShow = getRecentBlogs();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogsToShow.map((blog) => (
          <div key={blog._id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-blue-900/10 transition-all duration-200 hover:-translate-y-1">
            {blog.image ? (
              <div className="h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              </div>
            ) : (
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.desc}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                  </svg>
                  <span>{blog.likes.length}</span>
                </div>
              </div>
              
              <div className="flex justify-between gap-2">
                <Link 
                  href={`/blogs/${blog._id}`} 
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md text-center transition-colors"
                >
                  View
                </Link>
                <Link 
                  href={`/blogs/edit/${blog._id}`} 
                  className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md text-center transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-12 px-4 relative overflow-hidden">
          {/* Add dot pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-800 overflow-hidden flex items-center justify-center text-4xl font-bold text-gray-300">
                {user?.username?.charAt(0)?.toUpperCase() || '?'}
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user?.username || 'User'}'s Blog</h1>
                <p className="text-gray-300 mb-6 max-w-2xl">
                  Welcome to your personal blogging dashboard. Here you can manage all your content and track engagement.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg px-6 py-3 text-center">
                    <div className="text-2xl font-bold text-white">{blogs.length}</div>
                    <div className="text-sm text-gray-400">Blogs</div>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg px-6 py-3 text-center">
                    <div className="text-2xl font-bold text-white">{totalLikes}</div>
                    <div className="text-sm text-gray-400">Total Likes</div>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg px-6 py-3 text-center">
                    <div className="text-2xl font-bold text-white">
                      {blogs.length > 0 ? Math.max(...blogs.map(blog => blog.likes.length)) : 0}
                    </div>
                    <div className="text-sm text-gray-400">Most Popular</div>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div>
                <Link 
                  href="/blogs/new" 
                  className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  New Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('all')}
            >
              All Blogs
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'popular' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('popular')}
            >
              Most Popular
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'recent' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('recent')}
            >
              Most Recent
            </button>
          </div>
          
          {/* Blog Grid */}
          {renderBlogs()}
        </div>
      </div>
    </Layout>
  );
}