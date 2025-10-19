/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gb: {
          screenDark: '#0f380f',
          screenMid: '#306230',
          screenLight: '#8bac0f',
          screenLightest: '#9bbc0f',
          shell: '#e8e8d0',
          shellDark: '#c4c4a8',
          accent: '#8f8f77',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      animation: {
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}

