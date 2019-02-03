const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + 'views/partials');
app.set('view engine', hbs);


hbs.registerHelper('getCurrentYear' , () =>{
  return new Date().getFullYear()
});

app.use((req,res,next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n', (error) => {
  if(error){
  console.log('Unable to append to file');
}
});
next();
});

app.use((req,res,next) => {
  res.render('maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
  res.send({
    name: 'Saurabh',
    surname: 'Mishra'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : 'ABOUT PAGE',
  });
});

app.get('/home',(req,res) => {
  res.render('home.hbs',{
    pageTitle : 'Welcome Page',
    copyRight : 'All rights reserved: ' + new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {

  res.send({
    message: 'Incorrect request',
    fix: 'Try again with correct requests'
  });
});

app.listen(3000, () => {
console.log('APP has started on port 3000');
});
