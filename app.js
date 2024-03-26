const express = require('express');
const ProductManager = require("./ProductManager");
const productManager = new ProductManager("./ProductManager");
const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  let products = await productManager.getProducts();
  if (limit) {
    products = products.slice(0, limit);
  }
  res.status(200).send({ products });
});


app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
  
    if (!product) {
      res.status(404).send({ error: 'producto no encontrado' });
    } else {
      res.status(200).send({ product });
    }
  });

  const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});