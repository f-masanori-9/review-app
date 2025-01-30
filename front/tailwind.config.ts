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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#06b6d4",
        lightPrimary: "#ebf8ff",
        secondary: "#ecc94b",
        primaryGray: "#718096",
        lightGray: "#f7fafc",
      },
    },
  },
  plugins: [],
} satisfies Config;
