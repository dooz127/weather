const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Set up view engine
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials'));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('', (req, res) => {
  res.render('templates/index', {
    title: 'Weather app',
    name: 'Duy Nguyen'
  });
});

app.get('/about', (req, res) => {
  res.render('templates/about', {
    title: 'About Me',
    name: 'Duy Nguyen'
  });
});

app.get('/help', (req, res) => {
  res.render('templates/help', {
    title: 'Help',
    name: 'Duy Nguyen',
    message: 'This is some helpful text.'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  const { address } = req.query;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error2, forecastData) => {
      if (error2) {
        return res.send({ error2 });
      }

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('templates/404', {
    title: '404',
    errorMessage: 'Help article not found.',
    name: 'Duy Nguyen'
  });
});

// Set up 404 page
app.get('*', (req, res) => {
  res.render('templates/404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Duy Nguyen'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
