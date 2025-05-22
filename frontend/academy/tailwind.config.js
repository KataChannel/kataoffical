/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      order: {
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10'
      },
      colors: {
        light: {
          background: '#fff',
          text: '#000',
          primary: '#3366ff',
          secondary: '#f0f0f0',
        },
        dark: {
          background: '#111',
          text: '#fff',
          primary: '#00ccff',
          secondary: '#333',
        },
      },
      width: {
          'screen-40': 'calc(100% - 160px) !important',      
          'screen-60': 'calc(100% - 240px) !important',   
          'screen-14': 'calc(100vw - 3.5rem) !important',     
      },
      height: {
          'screen-16': 'calc(100vh - 4rem) !important',              
          'screen-14': 'calc(100vh - 3.5rem) !important', 
          'screen-12': 'calc(100vh - 3rem) !important',                
          'screen-20': 'calc(100vh - 5rem) !important',                
          'screen-24': 'calc(100vh - 6rem) !important',                
          'screen-28': 'calc(100vh - 7rem) !important',                
      },
    },
    screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1200px',
    },
  },
  plugins: [],
}

