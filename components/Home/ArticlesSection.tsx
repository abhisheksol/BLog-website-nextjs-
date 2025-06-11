'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// JSON data structure for articles
const articlesData = {
  sectionTitle: "Latest Articles",
  viewAllLink: "/blogs",
  cards: [
    {
      id: 1,
      category: "Freelance",
      title: "Freelancer & WFH",
      description: "Learn how to be a freelancer, work and stay at home",
      readMoreLink: "/freelance",
      bgGradient: "from-cyan-100 to-blue-200",
      categoryStyle: "bg-cyan-500/20 text-cyan-700",
      linkColor: "text-cyan-600",
      icon: {
        type: "svg",
        path: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        strokeWidth: 1.5
      },
      animationDelay: 0.1
    },
    {
      id: 2,
      category: "Tips & Trick",
      title: "Pomodoro Method",
      description: "Learn how to be a programmer, work and managing your timer",
      readMoreLink: "/tutorial",
      bgGradient: "from-orange-100 to-pink-200",
      categoryStyle: "bg-orange-500/20 text-orange-700",
      linkColor: "text-orange-600",
      icon: {
        type: "emoji",
        emoji: "⏰",
        decorations: [
          { color: "bg-white", size: "w-4 h-4", position: "-top-1 -right-1" },
          { color: "bg-yellow-400", size: "w-3 h-3", position: "-bottom-2 -left-1" },
          { color: "bg-pink-400", size: "w-2 h-2", position: "-bottom-1 right-2" }
        ]
      },
      animationDelay: 0.2
    },
    {
      id: 3,
      category: "Tutorial",
      title: "Ready to Switch? It's simple.",
      description: "Simple is the ultimate sophistication. We focus on creating red jackets or wherever you...",
      readMoreLink: "/design",
      bgGradient: "from-yellow-100 to-yellow-200",
      categoryStyle: "bg-yellow-500/20 text-yellow-700",
      linkColor: "text-yellow-600",
      icon: {
        type: "emoji",
        emoji: "📱"
      },
      animationDelay: 0.3
    },
    {
      id: 4,
      category: "Projection",
      title: "Build a solid team",
      description: "A flexible workflow to your work to help from you...",
      readMoreLink: "/design",
      bgGradient: "from-purple-100 to-indigo-200",
      categoryStyle: "bg-purple-500/20 text-purple-700",
      linkColor: "text-purple-600",
      icon: {
        type: "team",
        avatars: [
          { color: "bg-purple-400" },
          { color: "bg-indigo-400" },
          { color: "bg-pink-400" }
        ]
      },
      animationDelay: 0.4
    }
  ],
  inspirationCard: {
    title: "Collect and Save Inspirations",
    description: "Find inspiration has never been easier than with a new...",
    buttonText: "Start exploring",
    bgGradient: "from-purple-200 to-pink-200",
    buttonStyle: "bg-purple-600 hover:bg-purple-700",
    gallery: [
      { color: "bg-green-300" },
      { color: "bg-blue-300" },
      { color: "bg-cyan-300" },
      { color: "bg-yellow-300" },
      { color: "bg-pink-300" },
      { color: "bg-purple-300" },
      { color: "bg-red-300" },
      { color: "bg-orange-300" },
      { color: "bg-teal-300" }
    ],
    animationDelay: 0.5
  }
};

const ArticlesSection: React.FC = () => {
  const renderIcon = (iconData: any) => {
    if (iconData.type === "svg") {
      return (
        <div className="w-24 h-16 bg-gray-300 rounded-lg ml-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={iconData.strokeWidth || 2} 
              d={iconData.path} 
            />
          </svg>
        </div>
      );
    }

    if (iconData.type === "emoji") {
      return (
        <div className="w-24 h-16 flex items-center justify-center ml-4">
          <div className="relative">
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{iconData.emoji}</span>
            </div>
            {iconData.decorations?.map((decoration: any, index: number) => (
              <div 
                key={index}
                className={`absolute ${decoration.position} ${decoration.size} ${decoration.color} rounded-full`}
              ></div>
            ))}
          </div>
        </div>
      );
    }

    if (iconData.type === "team") {
      return (
        <div className="w-24 h-16 flex items-center justify-center ml-4">
          <div className="flex -space-x-2">
            {iconData.avatars.map((avatar: any, index: number) => (
              <div 
                key={index}
                className={`w-8 h-8 ${avatar.color} rounded-full border-2 border-white`}
              ></div>
            ))}
          </div>
        </div>
      );
    }

    // Default case
    return (
      <div className="w-20 h-16 flex items-center justify-center ml-4">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">{iconData.emoji || "📱"}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">{articlesData.sectionTitle}</h2>
        <Link 
          href={articlesData.viewAllLink} 
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          view all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articlesData.cards.map((card) => (
          <motion.div 
            key={card.id}
            className={`relative p-6 rounded-3xl overflow-hidden bg-gradient-to-br ${card.bgGradient} text-gray-800`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.animationDelay, duration: 0.6 }}
          >
            <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 ${card.categoryStyle} text-xs font-medium rounded-full`}>
                {card.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 pt-8">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                <Link href={card.readMoreLink} className={`${card.linkColor} text-sm font-medium hover:underline`}>
                  read more
                </Link>
              </div>
              {renderIcon(card.icon)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collect and Save Inspirations Card - Full Width */}
      <motion.div 
        className={`mt-6 relative p-8 rounded-3xl overflow-hidden bg-gradient-to-r ${articlesData.inspirationCard.bgGradient} text-gray-800`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: articlesData.inspirationCard.animationDelay, duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{articlesData.inspirationCard.title}</h3>
            <p className="text-gray-600 mb-6 max-w-md">{articlesData.inspirationCard.description}</p>
            <button className={`px-6 py-3 ${articlesData.inspirationCard.buttonStyle} text-white font-medium rounded-lg transition-colors`}>
              {articlesData.inspirationCard.buttonText}
            </button>
          </div>
          <div className="hidden md:block ml-8">
            <div className="grid grid-cols-3 gap-2 w-48">
              {articlesData.inspirationCard.gallery.map((item, index) => (
                <div key={index} className={`w-14 h-14 ${item.color} rounded-lg`}></div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArticlesSection;
