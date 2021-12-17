const express = require("express");
const app = express();
const { products } = require("..//data");

app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1> <a href="/api/products">Products</a>`);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  console.log(req.params);
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not exist.");
  } else {
    res.json(singleProduct);
  }
});

app.get("/api/products/:productID/review/:reviewID", (req, res) => {
  console.log(req.params);
  const { productID, reviewID } = req.params;
  const review = products.find(
    (product) =>
      product.id === Number(productID) && product.review.id === Number(reviewID)
  );
  if (!review) {
    res.status(404).send("Review not found");
  } else {
    res.json(review);
  }
});

app.get("/api/v1/query", (req, res) => {
  let sortedProducts = [...products];
  const { search, limit } = req.query;
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedProducts);
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080.");
});
