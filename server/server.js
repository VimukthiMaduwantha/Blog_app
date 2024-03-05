const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenc = require('dotenv');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Db connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!!");
})

app.listen(port, () => {
    console.log("PORT connected on " + port)
})

//Blog category
const categoryRouter = require('./routes/CategoryRoute');
app.use('/api/category', categoryRouter);

// # maduwanthavimukthi IQA5pPClQXgHgYLr
// # mongodb+srv://maduwanthavimukthi:<password>@cluster0.eihcbyt.mongodb.net/