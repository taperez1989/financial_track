const express = require("express");
const router = express.Router();

const records = require("./recordsRoute");

router.use("/records", records);

console.log("✅ Routes/index.js loaded");

module.exports = router;