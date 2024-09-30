/** @type {import('tailwindcss').Config} */
const {nextui, colors} = require("@nextui-org/react");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        'green-panda': '#40C48E'
      },
      colors: {
        meant:"#5FFFA0",
        midMeant : "#43ae6e",
        meantDark:"#1d8948",
        meantExtraDark:"#156c38",
        lightWhite:"#f3f3f3",
        lightGray:"#bababa",
        midGray:"#656566",
        raisinBlack:"#1e1e25",
        otherGray : "#45454c",
        darkGray:"#2d2d36",
        darkBlack:"#0D0E0D"
      },
      fontFamily: {
        chackra: ['var(--font-chakra_petch)'],
        jost:['var(--font-jost)'],
      },
    },
  },
  plugins: [nextui()],
};
