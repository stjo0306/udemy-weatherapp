const request = require('postman-request');

const accessKey = 'ce9a2c51ba76d34e95c2b19f361548aa'
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&units=f&query=${latitude},${longitude}`
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      return callback(error, undefined);
    } else if (body.error) {
      return callback(body.error, undefined);
    } else {
      const {
        temperature,
        feelslike,
        weather_descriptions,
      } = body.current;
      const summary = weather_descriptions[0];
      callback(undefined, `${summary} with a temp of ${temperature}, but feels like ${feelslike}`);
    }
  });
};

module.exports = {
  forecast,
};
