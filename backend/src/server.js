import express from 'express';
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from '../config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/ratelimiter.js';

import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Built-in middleware
app.use(cors({
  origin: "http://localhost:5174", // allows requests from this origin (our frontend)
})); // allows our server to access different URL (api) from our frontend (localhost:3000) without any CORS issues. It adds the necessary headers to the response to allow cross-origin requests.


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