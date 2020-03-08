const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

// Connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected");
    })
    .catch(err => {
        console.log("error: ", err);
    });

// Middleware
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("server up and running..."));
