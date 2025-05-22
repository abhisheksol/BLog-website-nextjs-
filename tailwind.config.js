/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'blob-slow': 'blob 25s infinite alternate',
        'blob-medium': 'blob 20s infinite alternate',
        'blob-fast': 'blob 15s infinite alternate',
        'border': 'border 8s infinite alternate',
        'border-mask': 'border-mask 8s infinite alternate',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '25%': {
            transform: 'translate(-20px, 20px) scale(1.1)',
            borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
          },
          '50%': {
            transform: 'translate(20px, -15px) scale(0.9)',
            borderRadius: '70% 30% 50% 50% / 30% 40% 60% 70%',
          },
          '75%': {
            transform: 'translate(15px, 10px) scale(1.05)',
            borderRadius: '30% 60% 40% 70% / 50% 60% 30% 40%',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
        },
        border: {
          '0%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '25%': {
            borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
          },
          '50%': {
            borderRadius: '70% 30% 50% 50% / 30% 40% 60% 70%',
          },
          '75%': {
            borderRadius: '30% 60% 40% 70% / 50% 60% 30% 40%',
          },
          '100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
        },
        'border-mask': {
          '0%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '25%': {
            borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
          },
          '50%': {
            borderRadius: '70% 30% 50% 50% / 30% 40% 60% 70%',
          },
          '75%': {
            borderRadius: '30% 60% 40% 70% / 50% 60% 30% 40%',
          },
          '100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
        },
      },
    },
  },
  plugins: [],
}
