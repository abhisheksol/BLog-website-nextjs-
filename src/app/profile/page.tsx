'use client';

import React from 'react';
import Layout from '../../../components/Layout';
import { motion } from 'framer-motion';

function ProfilePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Construction icon */}
            <motion.div
              className="w-28 h-28 mx-auto mb-6 text-amber-400"
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2">Profile Page Under Construction</h1>
              <div className="h-1 w-24 bg-amber-400 mx-auto my-6"></div>
              <p className="text-xl text-gray-300 mb-6">
                We're working hard to build an amazing profile experience for you.
              </p>
              <p className="text-gray-400 mb-8">
                This page will be available soon with all your profile management features.
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-4 mb-8 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a 
                  href="/blogs"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Blogs
                </motion.a>
                <motion.a 
                  href="/"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Return Home
                </motion.a>
              </div>
            </motion.div>
            
            {/* Construction elements */}
            <div className="absolute top-6 left-6 w-8 h-8 bg-amber-500 rounded-full opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-amber-500 rounded-full opacity-10"></div>
            <div className="absolute top-1/3 right-12 w-4 h-12 bg-amber-400 rounded-full opacity-20 rotate-12"></div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;