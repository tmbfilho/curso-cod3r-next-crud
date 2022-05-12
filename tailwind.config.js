module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /^bg-/
    },
    {
      pattern: /^to-/
    },
    {
      pattern: /^from-/
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}