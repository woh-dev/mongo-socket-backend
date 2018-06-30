const { storeController } = require('./controllers/stores');
const { userController } = require('./controllers/users');
const { productController } = require('./controllers/products');

const storeData = [
  { name: 'RipCurl', street: '1395 Pacific Ave', city: 'Santa Cruz', state: 'CA', zip: '95060', },
  { name: 'Kramerbooks', street: '1517 Connecticut Ave NW', city: 'Washington', state: 'DC', zip: '20036', },
  { name: 'Bookshop Santa Cruz', street: '1520 Pacific Ave', city: 'Santa Cruz', state: 'CA', zip: '95060', },
  { name: 'O\'Neill Surf Shop', street: '110 Cooper St', city: 'Santa Cruz', state: 'CA', zip: '95060', },
  { name: 'Santa Cruz Bicycles', street: '2841 Mission St', city: 'Santa Cruz', state: 'CA', zip: '95060', },
  { name: 'Target', street: '1825 41st Ave', city: 'Capitola', state: 'CA', zip: '95010', },
  { name: 'Childish', street: '1127 Soquel Ave', city: 'Santa Cruz', state: 'CA', zip: '95062', },
];

const userData = [
  { name: 'Chris', location: { lat: 36.974538, lng: -122.026423 } },
  { name: 'Jeff', location: { lat: 38.897663, lng: -77.036574 } },
];


const productData = [
  // { name: 'Surfboard', price: 300, store: '5b3314274780370092ab5c63' },
  { name: 'Wetsuit', price: 175, store: '5b3314274780370092ab5c63' },
  { name: 'Overpriced Tshirt', price: 50, store: '5b3314274780370092ab5c63' },
];

const seedDatabase = () => {
  // storeData.forEach((biz) => {
  //   storeController.createStore(biz);
  // });

  userData.forEach((user) => {
    userController.createUser(user);
  });

  // productData.forEach((product) => {
  //   productController.addProduct(product);
  // });
};

// seedDatabase();

// userController.setFavorite("5b3462ee297023145796de30", "5b3314274780370092ab5c63");

userController.getFavorites("5b3462ee297023145796de30")
  .then(result => console.log(result.following));