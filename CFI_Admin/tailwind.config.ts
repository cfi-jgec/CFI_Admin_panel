import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navBg: "rgb(28,36,52)",
        topBg: "#ffffff",
        bodyBg: "rgb(241,245,249)",
        btnBg: "#A90DF2",
        title: "#000000",
        subtitle: "#0d1216",
        paragraph: "#0000006b",
        pink_1: "#EE119C",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs:"475px"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
