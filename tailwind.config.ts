import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-all-sides":
          "inset 0 2px 5px rgba(0, 0, 0, 0.1), inset 0 -2px 5px rgba(0, 0, 0, 0), inset -2px 0 5px rgba(0, 0, 0, 0.1), inset 2px 0 5px rgba(0, 0, 0, 0.1)",
        "outer-all-sides":
          "0 4px 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(0, 0, 0, 0.05)",
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nameTextColor: "#545871",
        bgColor: "#E8F1FD",
        placeholderColor: "#B0B0B0",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",

      "2xl": "1536px",
      // => @media (min-width: 1280px) { ... }
      "3xl": "1836px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
