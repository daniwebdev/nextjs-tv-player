import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          DEFAULT: '#37506D',
          50: '#EBEFF5',
          100: '#E4EAF1',
          200: '#B7C4D1',
          300: '#8D9DB0',
          400: '#677789',
          500: '#45515E',
          600: '#36424E',
          700: '#29323D',
          800: '#1C232B',
          900: '#11171C',
          950: '#070C13'
        }
      },
    },
  },
  plugins: [],
};
export default config;
