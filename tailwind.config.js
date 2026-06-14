/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#f3f0ff",
          100: "#e9e3ff",
          200: "#d4caff",
          300: "#b3a4ff",
          400: "#8b6fff",
          500: "#6d3fd4",
          600: "#5a2db8",
          700: "#4a1f9e",
          800: "#3b1680",
          900: "#2a0f5e",
        },
        accent: {
          cyan:   "#00d4ff",
          green:  "#00c853",
          orange: "#ff6d00",
          blue:   "#1565c0",
        },
        dark: {
          50:  "#f5f5f5",
          100: "#e0e0e0",
          800: "#1a1a2e",
          900: "#0f0f1a",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hr-gradient": "linear-gradient(135deg, #2a0f5e 0%, #1565c0 40%, #00c853 70%, #ff6d00 100%)",
        "hr-gradient-soft": "linear-gradient(135deg, #4a1f9e 0%, #1565c0 50%, #00d4ff 100%)",
        "sidebar-gradient": "linear-gradient(180deg, #2a0f5e 0%, #4a1f9e 50%, #1565c0 100%)",
      }
    },
  },
  plugins: [],
}