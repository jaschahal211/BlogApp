import express from 'express';
import 'dotenv/config'; // Make sure you have 'dotenv' installed: npm install dotenv
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

console.log("DB URI loaded:", process.env.MONGODB_URI);
const app = express();
await connectDB();


// Middlewares
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// Routes
app.get('/', (req, res) => {
    res.send("API is Working");
});
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
