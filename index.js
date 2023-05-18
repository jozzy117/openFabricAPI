const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const productRoutes = require('./routes/productRoutes');
const users = [
  { email: 'admin@example.com', password: 'password' }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB

if(process.env.NODE_ENV === 'development'){
  console.log('This is a test');
  const connectionString = 'mongodb://localhost/product-api';
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  console.log('This is for real');
  const connectionString = 'mongodb+srv://ojakovojo:mQnVjCDy1unkpSKJ@cluster0.s9cu3ij.mongodb.net/?retryWrites=true&w=majority';
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  });
}

// API routes
app.use('/api/products', productRoutes);

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, 'secret_key');

  res.send({ code:200, token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
