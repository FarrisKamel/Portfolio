import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import homepageRoutes from "./routes/user_info.route.js";
import cors from "cors";

// Initialize Express app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;
app.use(cors());
const __dirname = path.resolve();

// Accept JSON data in body
app.use(express.json());

// Serve API routes first
app.use("/api", homepageRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "frontend", "dist");
    app.use(express.static(frontendPath));

    console.log(`Serving frontend from: ${frontendPath}`);

    // Catch-all route for React frontend
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});

