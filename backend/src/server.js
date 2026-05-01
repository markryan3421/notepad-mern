import express from 'express';
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from '../config/db.js';
import rateLimiter from './middleware/rateLimiter';
import dotenv from "dotenv";
import path from "path";

import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // This is needed to get the correct path for serving static files in production. It resolves the current directory of the file, which is necessary when we want to serve our frontend build files from the backend in production.

// Only use CORS in production, since in development we are running both frontend and backend on localhost, so there won't be any CORS issues. In production, our frontend and backend will be on different domains, so we need to enable CORS to allow our frontend to make requests to our backend.
if (process.env.NODE_ENV !== "production") {
  // Built-in middleware 
  app.use(cors({
    origin: "http://localhost:5174", // allows requests from this origin (our frontend)
  })); // allows our server to access different URL (api) from our frontend (localhost:3000) without any CORS issues. It adds the necessary headers to the response to allow cross-origin requests.
}

app.use(express.json());
app.use(rateLimiter);

// // Sample custom middleware
// app.use((req, res, next) => {
//   console.log("New request detected");
//   next();
// });

// Routes
app.use("/api/notes", noteRoutes);



if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build directory in production
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/:path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to database first before listening to the port
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});