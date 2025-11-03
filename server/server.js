const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(cors());


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("✅ MongoDB connection successful");
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
    });

const routes = require("./routes");
 
app.use("/api", routes); // all routes prefixed with /api


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});