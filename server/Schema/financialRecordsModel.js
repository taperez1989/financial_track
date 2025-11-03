const mongoose = require("mongoose");

const financialRecordSchema = new mongoose.Schema({
   
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },

});

const financialRecord = mongoose.model("FinancialRecord", financialRecordSchema);

module.exports = financialRecord; 