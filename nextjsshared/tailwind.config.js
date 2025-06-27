/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sử dụng naming convention của Tailwind
        'dashboard-50': '#f8fafc',
        'dashboard-100': '#f1f5f9',
        'dashboard-200': '#e2e8f0',
        'dashboard-300': '#cbd5e1',
        'dashboard-400': '#94a3b8',
        'dashboard-500': '#64748b',
        'dashboard-600': '#475569',
        'dashboard-700': '#334155',
        'dashboard-800': '#1e293b',
        'dashboard-900': '#0f172a',
        'dashboard-primary': '#3b82f6',
        'dashboard-secondary': '#64748b',
        'dashboard-accent': '#10b981',
        'dashboard-background': '#f8fafc',
        'dashboard-surface': '#ffffff',
        'dashboard-text': '#1e293b',
        
        // Hoặc sử dụng object notation
        dashboard: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#10b981',
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b'
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Thêm các classes sẽ được sử dụng động
    'bg-dashboard-primary',
    'bg-dashboard-background',
    'text-dashboard-primary',
    'text-dashboard-text',
    'border-dashboard-primary',
    'hover:bg-dashboard-primary',
    'hover:text-white',
    'w-16',
    'w-64',
    'translate-x-0',
    '-translate-x-full',
    'lg:translate-x-0',
    // Thêm các dashboard colors
    ...Array.from({length: 10}, (_, i) => `bg-dashboard-${(i+1)*100}`),
    ...Array.from({length: 10}, (_, i) => `text-dashboard-${(i+1)*100}`),
  ]
}