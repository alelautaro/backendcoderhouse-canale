const ProductManager = require("./ProductManager");

const productManager = new ProductManager();

productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));

try {
  productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });
} catch (error) {
  console.error(error.message);
}

console.log(productManager.getProductById(1));

productManager.updateProduct(1, {
  title: 'producto prueba actualizado',
});

console.log(productManager.getProductById(1));

productManager.eliminarProducto(1);

console.log(productManager.getProducts());
