const request = require('request');
const key = 'UKKYYFAAPD3G4MMQ9RVYVYT8W';
const fetchTemp = (long, lat, loc, callback) => {
  const urlWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=metric&lang=en&key=${key}`;
  request({ url: urlWeather, json: true }, (error, res) => {
    if (error) {
      callback('Unable to connnect to location services', undefined);
    } else if (res.body.error) {
      callback('Unable to connnect to location services', undefined);
    } else {
      const today = res.body.days[0];
      const data =
        today.description +
        ' It is currently ' +
        today.temp +
        ' degrees celsius out in ' +
        loc +
        '. There is ' +
        today.precipprob +
        '% chance of rain today.';
      callback(undefined, data);
    }
  });
};

module.exports = fetchTemp;
