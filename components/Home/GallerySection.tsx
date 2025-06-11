'use client';

import React from 'react';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  desc: string;
  image: string;
  createdAt: string;
  likes: string[];
}

interface GallerySectionProps {
  blogs: Blog[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ blogs }) => {
  const blogsWithImages = blogs.filter(blog => blog.image);
  
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Galleries</h2>
        <Link 
          href="/blogs" 
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          view all
        </Link>
      </div>
      
      {blogsWithImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {blogsWithImages.slice(0, 8).map((blog, index) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog._id}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:scale-105 transition-all duration-300"
            >
              {/* Gradient background overlay based on index */}
              <div className={`absolute inset-0 ${
                index % 4 === 0 ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/30' :
                index % 4 === 1 ? 'bg-gradient-to-br from-red-500/20 to-orange-600/30' :
                index % 4 === 2 ? 'bg-gradient-to-br from-green-500/20 to-teal-600/30' :
                'bg-gradient-to-br from-blue-500/20 to-cyan-600/30'
              } opacity-80`}></div>
              
              {/* Blog image */}
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay with blog title */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <h3 className="text-white text-sm font-medium text-center line-clamp-2">
                  {blog.title}
                </h3>
              </div>
              
              {/* Corner icon indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-2">No images in gallery</h3>
          <p className="text-gray-400 mb-4">Create blogs with images to build your gallery</p>
          <Link 
            href="/blogs/new" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Create Blog with Image
          </Link>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
