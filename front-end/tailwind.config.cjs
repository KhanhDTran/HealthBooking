/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      minHeight: {
        400: "400px",
      },
    },
  },
  plugins: [require("daisyui")],
};
