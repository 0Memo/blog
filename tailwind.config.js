/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      navbar: ['Homemade Apple'],
      h1: ['Kalam'],
      h3: ['Kalam'],
      input: ['Kalam'],
      button: ['Kalam'],
      footer: ['Kalam'],
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};