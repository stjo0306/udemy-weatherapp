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
      console.log(body.current);
      const {
        temperature,
        feelslike,
        weather_descriptions,
        wind_speed,
        wind_dir,
        precip,
      } = body.current;
      const summary = weather_descriptions[0];
      callback(undefined, `${summary} with a temp of ${temperature}, but feels like ${feelslike}.  
      The wind speed is ${wind_speed} to the ${wind_dir}.  There is a ${precip * 100}% chance of precipitation.`);
    }
  });
};

module.exports = {
  forecast,
};
