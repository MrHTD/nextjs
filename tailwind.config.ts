import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-xl2': { 'max': '1439px' }, // 👈 custom breakpoint
        'max-lg2': { 'max': '1139px' }, // 👈 custom breakpoint
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        textcolor: "var(--textcolor)",
        textsecondary: "var(--textsecondary)",
        paracolor: "var(--paracolor)",
        footerbg: "var(--footerbg)",
        inputborder: "var(--inputborder)",
        buttoncolor: "var(--buttoncolor)",
        backgroundcolor: "var(--backgroundcolor)",
      },
    },
  },
  plugins: [],
};
export default config;
