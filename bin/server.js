#!/usr/bin/env node

var express = require('express');
var app = express(),
  request= require('request'),
  isDev = process.env.NODE_ENV === 'development',
  port = +(process.env.PORT || 3000); //cast to number

if (isDev) {
  port = port + 1; //use set port+1 on dev environment as browsersync uses set port for proxying this server
}

app.set('case sensitive routing', false);

app.post( '/email.php', function( req, res ){
  req.pipe( request({
    url: 'http://localhost:8000/email.php',
    qs: req.query,
    method: req.method
  }, function(error){
    if(error) {
      if (error.code === 'ECONNREFUSED'){
        console.error('Refused connection');
      } else {
        throw error;
      }
    }
  })).pipe( res );
});

app.use(express.static(process.cwd() + '/dist', {
  extensions: ['html']
})); // serve html files

app.use('/assets', express.static(process.cwd() + '/dist/assets')); // server html files


app.use(function(req, res) {
  res.status(404).sendFile(process.cwd() + '/dist/index.html');
});

app.listen(port, function() {
  console.log('listening');
});
