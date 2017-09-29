#!/usr/bin/env node

var express = require('express');
var app = express(),
  bodyParser = require('body-parser'),
  isDev = process.env.NODE_ENV === 'development',
  port = +(process.env.PORT || 3000); //cast to number


app.use(bodyParser.urlencoded({extended:true}));

if (isDev) {
  port = port + 1; //use set port+1 on dev environment as browsersync uses set port for proxying this server
}

app.set('case sensitive routing', false);

app.use('/email.php', function(req, res) {
  var email = req.body.email;
  console.log('Email is', email);
  if(email) {
    res.redirect('/success');
  } else {
    res.redirect('/error');
  }
}); // server html files

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
