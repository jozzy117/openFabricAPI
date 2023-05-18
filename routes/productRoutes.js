const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../guards/authGuard');
const createProductSchema = require('../validations/schemaValidation');

// GET all products
router.get('/', (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET a single product
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// CREATE a new product
router.post('/', verifyToken, (req, res) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const product = new Product(req.body);
  product
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// UPDATE a product
router.put('/:id', verifyToken, (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// DELETE a product
router.delete('/:id', verifyToken, (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;