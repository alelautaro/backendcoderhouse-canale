const fs = require('fs');
const path = require('path');

class Product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  addProduct(product) {
    const requierearchivos = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    const archivosperdidos = requierearchivos.filter(field => !product[field]);

    if (archivosperdidos.length > 0) {
      throw new Error(`Faltan campos obligatorios: ${archivosperdidos.join(', ')}`);
    }

    const productoexistente = this.products.find(p => p.code === product.code);

    if (productoexistente) {
      throw new Error('El producto ya existe');
    }

    const newProduct = {
      id: this.idCounter,
      ...product,
    };

    this.products.push(newProduct);
    this.idCounter++;

    this.guardarProductos();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

   this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedProduct,
    };

    this.guardarProductos();
  }

  eliminarProducto(id) {
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products.splice(productIndex, 1);
    this.guardarProductos();
  }

  guardarProductos() {
    const productsJson = JSON.stringify(this.products, null, 2);
    const filePath = path.join(__dirname, 'products.json');
    fs.writeFileSync(filePath, productsJson);
  }

  cargarProductos() {
    const filePath = path.join(__dirname, 'products.json');

    if (!fs.existsSync(filePath)) {
      return;
    }

    const productsJson = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(productsJson);

    this.products = products;
    this.idCounter = this.products.length + 1;
  }
}



module.export(productManager);