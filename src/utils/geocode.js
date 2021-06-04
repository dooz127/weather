require('dotenv').config();
const fetch = require('node-fetch');

const geocode = async (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      callback('Unable to find location. Try another search.');
    }

    callback(null, {
      latitude: data.features[0].center[1],
      longitude: data.features[0].center[0],
      location: data.features[0].place_name
    });
  } catch (error) {
    callback('Unable to connect to location services!');
  }
};

module.exports = geocode;
