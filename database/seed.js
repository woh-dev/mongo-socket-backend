const mongoose = require('mongoose');
const config = require('./config/config');
const { User, Store, Product } = require('./index');

mongoose.connect(config.uri);

User.collection.drop();

User.create([{
  name: 'dan123',
}, {
  username: 'ben123',
}])
.then(user => {
  console.log(`${user.length} users created`);
})
.catch((err) => {
  console.log(err);
});