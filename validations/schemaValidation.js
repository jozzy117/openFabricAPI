const Joi = require('joi');

// Validation schema for creating a product
const createProductSchema = Joi.object({
  image: Joi.string().optional(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = createProductSchema;