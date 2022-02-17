const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'John Steckelberg',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'John Steckelberg',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This page is under construction',
    title: 'Help',
    name: 'John Steckelberg',
  });
});

// app.com/weather
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'An address must be provided',
    });
  };

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log(`geocode error: ${JSON.stringify(error)}`);
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log('weather error: ', error);
        return res.send({
          error,
        });
      }
      console.log(`Weather in ${JSON.stringify(location)}`);
      console.log(`is ${forecastData}`);
      res.send({
        forecast: forecastData,
        location: JSON.stringify(location),
        address: req.query.address,
      });
    })
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a "search" term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// help 404
app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'John Steckelberg',
    title: 'Help 404',
    errorMessage: 'Help article not found.',
  });
});

// 404
app.get('*', (req, res) => {
  res.render('404', {
    name: 'John Steckelberg',
    title: '404',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log('you\'ve been served');
});

