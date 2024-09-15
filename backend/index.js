import 'dotenv/config';
import { connect } from 'mongoose';
import express from 'express';
import cors from 'cors';
import recordRoutes from './routes/recordRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

const mongoURI = process.env.MONGO_URI.replace('${DB_PASSWORD}', process.env.DB_PASSWORD);

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/api', recordRoutes);
