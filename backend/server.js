import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import homepageRoutes from "./routes/user_info.route.js";

// initilaize express app
const app = express();
const PORT = process.env.PORT || 8001;
dotenv.config();

// Accept JSON data in body
app.use(express.json());

// call for homepage
app.use('/', homepageRoutes);

// Listen 
app.listen(PORT, () => {
    // connect to DB with lunch
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
