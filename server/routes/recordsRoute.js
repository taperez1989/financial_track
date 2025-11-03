const express = require("express");
const router = express.Router();
const { financialRecords } = require('../Schema/financialRecordsModel');
const financialRecord = require("../Schema/financialRecordsModel");

// route test
router.get("/ping", (req, res) => {
    res.send("✅ Records route is alive");
});


router.post("/create", async (req, res) => {
     console.log("📩 Incoming record:", req.body);
    try {
        const newRecordBody = new financialRecord(req.body);
        console.log(newRecordBody);
        const savedRecord = await newRecordBody.save();
        res.status(200).json(savedRecord); // return saved record
    } catch (err) {
        console.error("error saving record:", err);
        res.status(500).json({ message: "error saving record", error: err.message });
    }
});

// get route
router.get("/getAll", async (req, res) => {
    try {
        // const userId = req.params.userId;
        const records = await financialRecord.find();
        if (records.length === 0) {
            return res.status(404).json({message:"No records found for the user."});
        }
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
    console.log("✅ Routes/index.js loaded");

});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newRecord = new financialRecord(req.body);
        const updatedRecord = await financialRecord.findByIdAndUpdate(
            id,
            newRecord,
            { new: true }
        );

        if (!updatedRecord) return res.status(404).send();
        res.status(200).json(updatedRecord); // return saved record
    } catch (err) {
        res.status(500).json({ message: "error saving record" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
    
        const deletedRecord = await financialRecord.findByIdAndDelete( id);

        if (!deletedRecord) return res.status(404).send();
        res.status(200).json(deletedRecord); // return saved record
    } catch (err) {
        res.status(500).json({ message: "error saving record" });
    }
});

module.exports = router;
