import express from 'express';
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from '../config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/ratelimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Built-in middleware
app.use(express.json());
app.use(rateLimiter);

// // Sample custom middleware
// app.use((req, res, next) => {
//   console.log("New request detected");
//   next();
// });

// Routes
app.use("/api/notes", noteRoutes);

// Connect to database first before listening to the port
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});