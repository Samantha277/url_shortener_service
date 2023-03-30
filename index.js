const express = require('express');
const connectDB = require('./config/db');
const app = express();


//connect to database
connectDB();

//middleware to accept post url as json data
app.use(express.json({extented: false}));
//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));