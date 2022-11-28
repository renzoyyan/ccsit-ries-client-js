/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        "bc-primary": "#053E85",
        "bc-secondary": "#FAA434",
        "bc-tertiary": "#007FC6",
      },

      fontFamily: {
        inter: "'Inter', sans-serif",
      },

      backgroundImage: {
        "hero-pattern": "url('/assets/ccsit.svg')",
      },
      gridTemplateColumns: {
        layout: "281px 1fr",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
