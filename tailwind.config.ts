import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gray: {
          400: "#9CA3AF",
          100: "#E5E7EB",
        },
        purple: {
          600: "#7C3AED",
          500: "#9F7AEA",
          400: "#C084FC",
          300: "#D8B4FE",
        },
        customDark: "#1F1F2E",
        customGray: "#2A2A3D",
        customDarkPurple: "#5a11bb",
      },
    },
  },
  plugins: [],
} satisfies Config;
