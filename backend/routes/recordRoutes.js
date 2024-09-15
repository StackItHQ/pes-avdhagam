import express from 'express';
import Record from '../models/recordModel.js'; // Ensure the correct path and extension

const router = express.Router();

function logRequestDetails(req) {
    console.log(`Received ${req.method} request to ${req.path}`);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
}

// POST route for new entries
router.post('/update', async (req, res) => {
    logRequestDetails(req);

    try {
        const { sheetName, row, column, newValue } = req.body;

        const newRecord = new Record({
            sheetName,
            row,
            column,
            oldValue: '(empty)',
            newValue
        });

        await newRecord.save();
        console.log('New record saved to MongoDB successfully');

        res.status(201).json({ message: 'New entry logged and saved to MongoDB successfully!' });
    } catch (error) {
        console.error('Error processing POST request:', error);
        res.status(500).json({ message: 'Failed to save the new data to MongoDB', error: error.message });
    }
});

// PUT route for updating existing entries
router.put('/update', async (req, res) => {
    logRequestDetails(req);

    try {
        const { sheetName, row, column, oldValue, newValue } = req.body;

        const updatedRecord = await Record.findOneAndUpdate(
            { sheetName, row, column },
            { $set: { oldValue, newValue } },
            { new: true, upsert: true }
        );

        console.log('Record updated in MongoDB successfully');

        res.status(200).json({ message: 'Edit logged and updated in MongoDB successfully!' });
    } catch (error) {
        console.error('Error processing PUT request:', error);
        res.status(500).json({ message: 'Failed to update the data in MongoDB', error: error.message });
    }
});
export default router;
