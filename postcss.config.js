module.exports = {
  plugins: [
    try {
      require('tailwindcss')('./tailwind.config.js'),
    } catch (error) {
      console.error('Error loading tailwindcss:', error);
    }
    try {
      require('autoprefixer')({
        overrideBrowserslist: ['last 2 versions'],
      }),
    } catch (error) {
      console.error('Error loading autoprefixer:', error);
    }
  ],
};