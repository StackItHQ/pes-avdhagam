import express from 'express';
import Record from '../models/recordModel.js'; // Ensure the correct path and extension

const router = express.Router();

router.post('/update', async (req, res) => {
    try {
        const { sheetName, row, column, oldValue, newValue } = req.body;

        const newRecord = new Record({
            sheetName,
            row,
            column,
            oldValue,
            newValue
        });

        await newRecord.save();

        res.status(200).json({ message: 'Edit logged and saved to MongoDB successfully!' });
    } catch (error) {
        console.error('Error saving to MongoDB:', error);
        res.status(500).json({ message: 'Failed to save the data to MongoDB', error: error.message });
    }
});

export default router;
