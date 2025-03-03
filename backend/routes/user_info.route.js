import express from 'express';
import User from "../models/user_info.model.js";
import Project from "../models/project.model.js";
import Experience from "../models/experience.model.js";

const router = express.Router()

// Post Method to send Data, async function
router.post("/", async (req, res) => {
    const user = req.body; // retrive the user info

    // Check if all info is added
    if (!user || !user.name || !user.about || !user.linkedin || !user.email || !user.undergraduateSchool 
        || !user.undergraduateDegree || !user.graduateSchool || !user.graduateDegree){
        //Bad request, we don't have all the data needed
        //console.log(user);
        return res.status(400).json({success:false, message: "Please provide all user infomation"});
    }

    //create new user 
    const newUser = new User(user); 

    //try and catch to save to db
    try {
        await newUser.save();
        res.status(201).json({success:true, message: "New user created"}); // create code 
    } catch(error) {
        console.error("Error in creating user", error.message);
        res.status(500).json({success:false, message: "Error with creating user and db server"}); // Internal server error
    }

});

//Homepage data
router.get("/", async (req, res) => {
    try{
        const user = await User.find({}); // Get all users 
        //const project = await homepage_project.find({});
        //console.log(user);
        res.status(200).json({succes: true, data: user}); // Success
    } catch (error) {
        console.log("Error fetching the data");
        res.status(500).json({succes: false, message: "Server Error, Fetching Data"}); // Internal Server Error

    }
});

//Projectpage data
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({}); // Fetch all projects
        res.status(200).json({success: true, data: projects});
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        res.status(500).json({success: false, message: "Server Error: Fetching Projects"});
    }
});

//Projectpage data
router.get('/experience', async (req, res) => {
    try {
        const experiences = await Experience.find({}); // Fetch all projects
        res.status(200).json({success: true, data: experiences});
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        res.status(500).json({success: false, message: "Server Error: Fetching Projects"});
    }
});


export default router;
