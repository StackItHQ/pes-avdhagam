const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    row: Number,
    column: Number,
    value: String,
    timestamp: Date,
});

module.exports = mongoose.model('Record', recordSchema);
