#!/usr/bin/env node
var sync = require('browser-sync').create();
var port = +(process.env.PORT || 3000);
var proxyPort = port+1;

sync.watch([
  'dist/**/*.{js,css,html}',
  'dist/assets/img/*.*'
]).on('change', sync.reload);

sync.init({
  proxy: 'localhost:' + proxyPort, // local server port to proxy with browsersync
  port: port, // browsersync port to server files through
  ghostMode: false, //do not synchronise clicks,form inputs and scrolls between browsers
  reloadOnRestart: true,
  open: true, // open browser on start
  notify: true,
  minify: false
});
