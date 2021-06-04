require('dotenv').config();
const fetch = require('node-fetch');

const forecast = async (lat, long, callback) => {
  try {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${lat},${long}&units=f`
    );

    const data = await response.json();

    if (data.error) {
      callback('Unable to obtain forecast. Try another location.');
    }

    const { temperature, feelslike } = data.current;

    callback(null, `It is ${temperature}° F. It feels like ${feelslike}° F.`);
  } catch (error) {
    callback('Unable to connect to weather services.');
  }
};

module.exports = forecast;
