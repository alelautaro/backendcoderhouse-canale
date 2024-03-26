import express from 'express';
import ProductManager from './ProductManager.js';

const server = express();
const productManager = new ProductManager('./products.json');
const port = 80801;

server.get('/', (req, res) => {
  res.send('esta es la pantalla ');
});

server.listen(port, () => {
  console.log(`aplicacion cargada ${port}.`);
});

server.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let products = await productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

server.get('/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);

    if (!product) {
      res.status(404).send({ error: 'producto no encontrado' });
    } else {
      res.status(200).send({ product });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});