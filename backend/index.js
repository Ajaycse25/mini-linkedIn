const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGODB_URI)  
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
