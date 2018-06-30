const storeController = require('../database/controllers/stores');
const userController = require('../database/controllers/users');
console.log(userController);
let io = null;
let currentConnections = {};

exports.set = (socket) => {
  io = socket;
  io.sockets.on('connection', (client) => {
    currentConnections[client.id] = { socket: client };

    client.on('user', (userId) => {
      currentConnections[client.id].userId = userId;
    });

    client.on('getStores', async (userId, location, cb) => {
      userController.getNearestStores(userId, location)
        .then((stores) => {
          cb(null, stores);
        })
        .catch((err) => {
          console.log('error', err);
          cb(err, null);
        });
    });

    client.on('getFavorites', (userId, cb) => {
      userController.getFavorites(userId)
        .then((userRecord) => {
          let products = userRecord.following.reduce((accumulator, store) => {
            console.log('REDUCE', accumulator, store.products);
            return accumulator.concat(store.products);
          }, []);
          console.log(products);
          cb(null, products);
        })
        .catch((err) => {
          console.log('error', err);
          cb(err, null);
        });
    });

    client.on('setFavorite', (userId, storeId, cb) => {
      userController.setFavorite(userId, storeId)
        .then(result => cb(null, result))
        .catch((err) => {
          console.log('error', err);
          cb(err, null);
        });
    });

    client.on('disconnect', () => {
      delete currentConnections[client.id];
    });
  });
};

exports.get = () => io;

exports.connections = currentConnections;
