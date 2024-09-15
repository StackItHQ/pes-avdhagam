import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    sheetName: String,
    row: Number,
    column: Number,
    oldValue: String,
    newValue: String,
    timestamp: { type: Date, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
