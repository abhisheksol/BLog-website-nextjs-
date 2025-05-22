'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !desc || !imageFile) {
      alert('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to post a blog');
      return;
    }

    setLoading(true);

    try {
      const base64Image = await convertToBase64(imageFile);

      const res = await fetch('http://localhost:3000/api/blogs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, desc, image: base64Image }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Blog added successfully!');
        router.push('/blogs');
      } else {
        alert(data.message || 'Failed to add blog');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your blog description here..."
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-300 file:bg-blue-500 file:text-white file:rounded-md file:px-3 file:py-1 file:border-0"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-md text-white font-semibold transition duration-300"
          >
            {loading ? 'Posting...' : 'Post Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;


// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Layout from '../../../../components/Layout';
// import BlogForm from '../../../../components/BlogForm';
// import { useAuth } from '../../../../contexts/AuthContext';

// export default function NewBlog() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect if not logged in
//     if (!user && !loading) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <BlogForm />
//     </Layout>
//   );
// }