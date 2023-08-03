const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())//It will provide a parser which will help us to parse the data stream which we are getting from client.

app.use("/api/contacts", require("./routes/contactRoutes"));//it is middleware
app.use("/api/users", require("./routes/userRoutes"));//it is middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
//creating controller for connecting to database.
//whenever we want to use middlware we uses the app.use method