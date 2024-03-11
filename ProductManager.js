class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  addProduct(product) {
    const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
    const missingFields = requiredFields.filter((field) => !product[field]);

    if (missingFields.length > 0) {
      throw new Error(`Archivos no encontrados: ${missingFields.join(", ")}`);
    }

    const existingProduct = this.products.find((p) => p.code === product.code);

    if (existingProduct) {
      throw new Error("El producto ya existe");
    }

    const newProduct = {
      id: this.idCounter,
      ...product,
    };

    this.products.push(newProduct);
    this.idCounter++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  }
}

module.exports = ProductManager;
