const { User, Store } = require('../index');

const userController = {
  createUser: (data) => {
    const { name, location } = data;
    User.create({
      name,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat],
      },
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  },

  getNearestStores: (userId, location) => User.findById(userId)
    .then((userRecord) => {
      userRecord.location = { type: 'Point', coordinates: location };
      return userRecord.save();
    })
    .then(() => Store.aggregate([
      {
        $geoNear: {
          near: location,
          distanceField: 'dist.calculated',
          maxDistance: 0.05,
          spherical: true,
          distanceMultiplier: 6371000,
        },
      },
    ]))
    .then((results) => {
      const stores = results.map((store) => {
        const miles = store.dist.calculated * 0.000621371;
        store.dist.calculated = miles.toFixed(2);
        return store;
      });
      return stores;
    }),

  getFavorites: userId => User.findById(userId)
    .populate({
      path: 'following',
      populate: { path: 'products', populate: { path: 'store', select: 'name' } },
    }),

  setFavorite: (userId, storeId) => Store.findById(storeId)
    .then((store) => {
      console.log('the store', store);
      User.findById(userId)
        .then((userRecord) => {
          console.log(userRecord);
          userRecord.following.push(store);
          userRecord.save();
        });
    })
    .catch(error => console.log('Error setting favorite', error)),
};

module.exports = userController;
