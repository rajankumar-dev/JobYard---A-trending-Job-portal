import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

connectDB()
.then(() => {
    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
})
.catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
