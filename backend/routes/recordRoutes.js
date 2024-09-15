const express = require('express');
const router = express.Router();
const Record = require('../models/recordModel');

router.post('/records', async (req, res) => {
    try {
        const record = new Record(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/records', async (req, res) => {
    try {
        const records = await Record.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/records/:id', async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/records/:id', async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;