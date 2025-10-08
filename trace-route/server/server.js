import express from 'express';
import cors from 'cors';
import scansRouter from './routes/scans.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is healthy' });
});

app.use("/api/scan", scansRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});