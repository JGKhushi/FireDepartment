// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const nocRoutes = require('./routes/noc.routes');
const path = require('path');
const notifyRoutes = require("./routes/notificationRoutes")
dotenv.config();
connectDB();

const app = express();
// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/noc', nocRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/notify",notifyRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});