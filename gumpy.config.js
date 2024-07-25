/**
 * @type {import('./grumpy/types').Config}
 */
export default {
  outDir: './public/assets',
  build: {
    js: ['./src/js/app.js', './src/js/alpine.js', './src/js/htmx.js'],
  },
  copy: {
    css: ['./src/css/app.css'],
  },
  watch: {
    files: ['./src/**/*.{css,js}', './public/*.php'],
  },
}
