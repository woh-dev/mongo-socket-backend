const { User, Store, Product } = require('../index');

const productController = {
  addProduct: (data) => {
    const product = new Product(data);
    product.save()
      .then(() => Store.findById(data.store))
      .then((store) => {
        store.products.push(product);
        return store.save();
      })
      .then(result => console.log('Product saved', result))
      .catch(err => console.log('Error', err));
  },
};

module.export = productController;
