const browserSync = require('browser-sync').create();
const path = require('path');

browserSync.init({
  proxy: 'http://localhost:3000',
  files: ['public/**/*.*', 'views/**/*.*'],
  port: 4000,
  open: false,
  ui: false,
});