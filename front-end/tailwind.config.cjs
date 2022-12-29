/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      minHeight: {
        400: "400px",
      },
    },
    minWidth: {
      370: "375px",
    },
  },
  plugins: [require("daisyui")],
};
