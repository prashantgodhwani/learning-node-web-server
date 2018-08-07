const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var log = `${new Date().toString()} : ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log(err);
  }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintaince.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle : 'Home',
    bodyText : "This text should come here"
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle : 'About',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle : 'Projects',
    bodyText : 'Some projects here'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    status : 0,
    errorMessage : 'Request Failed.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
