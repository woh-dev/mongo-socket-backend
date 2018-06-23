const mongoose = require('mongoose');
const config = require('./config/config');
const db = mongoose.createConnection(config.uri);

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  store: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }]
});

const userSchema = mongoose.Schema({
  name: String,
  followStores: [{ type: mongoose.Schema.ObjectId, ref : 'Store' } ],
  location: { type: { type: String }, coordinates: [Number] },
});

userSchema.index({ "location": "2dsphere" });

const storeSchema = mongoose.Schema({
  name: String,
  products: [{ type: mongoose.Schema.ObjectId, ref : 'Product' } ],
  location: { type: { type: String }, coordinates: [Number] },
});

storeSchema.index({ "location": "2dsphere" });

const Product = db.model('Product', productSchema);

const User = db.model('User', userSchema);

const Store = db.model('Store', { name: String });

module.exports = {
  Product,
  User,
  Store,
}



