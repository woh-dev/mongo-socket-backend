const mongoose = require('mongoose');
const config = require('./config/config');

const db = mongoose.createConnection(config.uri);

/*** DEFINE STORES TABLE ***/
const storeSchema = mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

storeSchema.index({ location: '2dsphere' });

const Store = db.model('Store', storeSchema);

/*** DEFINE PRODUCTS TABLE ***/
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  store: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  }],
});

const Product = db.model('Product', productSchema);

/*** DEFINE USERS TABLE ***/
const userSchema = mongoose.Schema({
  name: String,
  following: [{ type: mongoose.Schema.ObjectId, ref: 'Store' }],
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
});

userSchema.index({ location: '2dsphere' });

const User = db.model('User', userSchema);

module.exports = {
  Store,
  User,
  Product,
};
