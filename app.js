// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Set the views directory and the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

require('dotenv').config();

const upload = multer({ storage });


// ... existing code ...

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// ... existing code ...

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', upload.single('image'), postRoutes);

// Render the index page
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/resister', (req, res) => {
    res.render('resister');

});
app.get('/login', (req, res) => {
    res.render('login');

});
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});

