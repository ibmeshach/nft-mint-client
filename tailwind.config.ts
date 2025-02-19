import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: ["class", '[data-mode="dark"]'],

  theme: {
    extend: {
      colors: {
        primary: "",
      },
      screens: {
        "3xs": "350px",
        "2xs": "480px",
        xs: "576px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
        "3xl": "1600px",
        "4xl": "1800px",
      },
    },
  },
  plugins: [],
} satisfies Config;
