// postcss.config.js
module.exports = {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},  // Add this line
      tailwindcss: {},
      autoprefixer: {},
    },
  }