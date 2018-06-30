const fetch = require('node-fetch');
const config = require('../config/config');
const { Store } = require('../index');

const storeController = {
  createStore: (data) => {
    const { name, street, city, state, zip } = data;
    storeController.validateAddress(street, city, state, zip)
      .then(response => response.json())
      .then((data) => {
        const coordinates = data.results[0].geometry.location;
        return Store.create({
          name,
          location: {
            type: 'Point',
            coordinates: [coordinates.lng, coordinates.lat],
          },
        });
      })
      .then(result => console.log('Store record created', result))
      .catch(error => console.log('Error', error));
  },

  retrieveProducts: (storeId) => {
    Store.findById(storeId)
      .populate('');
  },

  /* Helper function to generate geodata */
  validateAddress: (street, city, state, zip) => {
    const address = {
      street: street.split(' ').join('+'),
      city: city.split(' ').join('+'),
      state,
      zip,
    };
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.street},+${address.city},+${address.state}&key=${config.geo}`)
  },
};

module.export = storeController;
