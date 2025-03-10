import type { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";

const colors = {
  primary: "#06b6d4",
  lightPrimary: "#ebf8ff",
  secondary: "#ecc94b",
  primaryGray: "#718096",
  lightGray: "#f7fafc",
} as const;

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "200vw": "200vw",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ...colors,
      },
    },
  },
  variants: {
    extend: {
      // ...
      backgroundOpacity: ["active"],
    },
  },
  colors: colors,
  plugins: [],
} satisfies Config;

export default config;

export const resolvedConfig = resolveConfig(config);
