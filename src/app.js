const path = require('path');
const express = require('express');
const hbs = require('hbs');

const fetchTemp = require('./utils/fetchTemp');
const geocodeLocation = require('./utils/geocodeLocation');

//initialize express
const app = express();

//setup static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

//Set up handlebars engine and views location
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Daniel Beckley' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Daniel Beckley' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Daniel Beckley' });
});

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>');
// });
app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'asleep?',
    });
  }

  geocodeLocation(address, (error, { long, lat, loc } = {}) => {
    if (error) {
      return res.send(error);
    }
    fetchTemp(long, lat, loc, (error, forecast) => {
      if (error) {
        return res.send(error);
      }
      res.send({ forecast, location: loc, address });
    });
  });
});

app.get('/products', (req, res) => {
  console.log(req.query);
  res.send({
    prod: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', { errorMessage: 'No help anything here.' });
});

app.get('*', (req, res) => {
  res.render('404', { errorMessage: 'This page no fi exist' });
});

app.listen(8080, () => {
  console.log('Server is up');
});
