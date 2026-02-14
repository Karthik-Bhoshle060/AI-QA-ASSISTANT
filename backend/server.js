import express from "express";
import cors from "cors";
import 'dotenv/config';
import chatRoutes from "./src/routes/chat.routes.js"; // MUST include .js

const app = express();

app.use(cors());
app.use(express.json()); // This MUST be above the routes

// Routes
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));