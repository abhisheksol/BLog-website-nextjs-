'use client'; // if you're using app directory, keep this
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../../components/Layout';

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

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/blogs/getByUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="p-4">Loading blogs...</p>;

  return (
  
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-2" />
          <p className="text-sm text-gray-700 mb-1">{blog.desc}</p>
          <p className="text-xs text-gray-500">Created on: {new Date(blog.createdAt).toLocaleString()}</p>
          <p className="text-xs text-blue-600">Likes: {blog.likes.length}</p>
        </div>
      ))}
    </div>
    
    
  );
}

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Layout from '../../../../components/Layout';
// import BlogCard from '../../../../components/BlogCard';
// import { getUserBlogs } from '../../../../utils/api';
// import { useAuth } from '../../../../contexts/AuthContext';
// import { Blog, LikeResponse } from '../../../../types';

// export default function MyBlogs() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect if not logged in
//     if (!user && !authLoading) {
//       router.push('/login');
//       return;
//     }

//     const fetchBlogs = async () => {
//       try {
//         const data = await getUserBlogs();
        
//         // Transform data to match the format expected by BlogCard
//         const transformedData = data.map(blog => ({
//           ...blog,
//           createdBy: blog.createdBy,
//           likesCount: blog.likes?.length || 0,
//           likedByUser: false // You may need to calculate this based on user ID
//         }));
        
//         setBlogs(transformedData);
//       } catch (err: any) {
//         setError('Failed to load your blogs');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchBlogs();
//     }
//   }, [user, authLoading, router]);

//   const handleLike = (blogId: string, response: LikeResponse) => {
//     setBlogs(blogs.map(blog => {
//       if (blog._id === blogId) {
//         return {
//           ...blog,
//           likesCount: response.likesCount,
//           likedByUser: response.likedByUser
//         };
//       }
//       return blog;
//     }));
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
        
//         {loading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}
        
//         {!loading && !error && blogs.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">You haven&apos;t created any blogs yet</p>
//             <button
//               onClick={() => router.push('/blogs/new')}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Create Your First Blog
//             </button>
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map(blog => (
//             <BlogCard key={blog._id} blog={blog} onLike={handleLike} />
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }