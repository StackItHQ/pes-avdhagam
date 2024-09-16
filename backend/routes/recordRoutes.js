import express from 'express';
import Record from '../models/recordModel.js';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

function numberToColumnLetter(number) {
    let column = '';
    let temp;

    while (number > 0) {
        temp = (number - 1) % 26;
        column = String.fromCharCode(temp + 65) + column;
        number = Math.floor((number - temp) / 26);
    }

    return column;
}

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILEPATH = path.join(__dirname, '../stackit-435707-c30079190d07.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});
const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = '1IzVSC9mGrvHpeqmbleiLcEXnRmbPQ9t-Dc9fxQLLiBw';

function logRequestDetails(req) {
    console.log(`Received ${req.method} request to ${req.path}`);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
}
async function updateGoogleSheet(sheetName, row, columnNumber, value) {
    const columnLetter = numberToColumnLetter(columnNumber);
    const range = `${sheetName}!${columnLetter}${row}`;

    console.log(`Updating Google Sheet with range: ${range} and value: ${value}`);

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range,
            valueInputOption: 'RAW',
            resource: {
                values: [[value]]
            }
        });
        console.log('Google Sheet updated successfully');
    } catch (error) {
        console.error('Error updating Google Sheet:', error);
        throw error;
    }
}

async function deleteMongoRecord(sheetName, row, columnNumber) {
    try {
        await Record.deleteOne({ sheetName, row, column: columnNumber });
        console.log('MongoDB record deleted successfully');
    } catch (error) {
        console.error('Error deleting MongoDB record:', error);
        throw error;
    }
}

router.post('/update', async (req, res) => {
    logRequestDetails(req);

    try {
        const { sheetName, row, column, newValue } = req.body;
        if (!newValue) {
            await deleteMongoRecord(sheetName, row, column);
            console.log('Record deleted from MongoDB due to empty newValue');
        } else {
            const newRecord = new Record({
                sheetName,
                row,
                column,
                oldValue: '(empty)',
                newValue
            });

            await newRecord.save();
            console.log('New record saved to MongoDB successfully');
        }

        await updateGoogleSheet(sheetName, row, column, newValue);

        res.status(201).json({ message: 'Data processed successfully!' });
    } catch (error) {
        console.error('Error processing POST request:', error);
        res.status(500).json({ message: 'Failed to save the new data to MongoDB', error: error.message });
    }
});

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
        if (!newValue) {
            await deleteMongoRecord(sheetName, row, column);
            console.log('Record deleted from MongoDB due to empty newValue');
        } else {
            await updateGoogleSheet(sheetName, row, column, newValue);
        }

        res.status(200).json({ message: 'Edit logged and updated in MongoDB successfully!' });
    } catch (error) {
        console.error('Error processing PUT request:', error);
        res.status(500).json({ message: 'Failed to update the data in MongoDB', error: error.message });
    }
});

export default router;
