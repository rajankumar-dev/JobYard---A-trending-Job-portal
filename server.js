import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});