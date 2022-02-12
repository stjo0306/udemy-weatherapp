const request = require('postman-request');

const mapApiKey = 'pk.eyJ1Ijoic3RqbzAzMDYiLCJhIjoiY2t5eGZ6MmdnMGhwajJwcDFndWVpZWVzZCJ9.6jftzSFUnyvlh_Vm-MZoXw'
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapApiKey}&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      return callback(error, undefined);
    } else if (body.features.length === 0) {
      return callback('unable to find location', undefined);
    }
    const { center, place_name } = body.features[0];
    callback(undefined, {
      latitude: center[1],
      longitude: center[0],
      location: place_name,
    });
  });
};

module.exports = {
  geocode,
};
