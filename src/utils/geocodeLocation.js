const request = require('request');
const accessToken =
  'pk.eyJ1IjoiY29hY2hsaXZpbmdsZWdlbmQiLCJhIjoiY2t2ZHcxM2RvMWN6NTMxcGd3Zjd0a2J6MSJ9.6IYNEVfDAPwLVI-4SGMzXg';

const geocodeLocation = (address, callback) => {
  const urlLocate = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=${accessToken}`;
  request({ url: urlLocate, json: true }, (error, res) => {
    if (error) {
      callback('Unable to connnect to location services', undefined);
    } else if (res.body.features.length === 0) {
      callback('Unable to find location, try another search', undefined);
    } else {
      // const data = JSON.parse(res.body);
      long = res.body.features[0].center[0];
      lat = res.body.features[0].center[1];
      loc = res.body.features[0].place_name;
      callback(undefined, { long, lat, loc });
    }
  });
};

module.exports = geocodeLocation;
