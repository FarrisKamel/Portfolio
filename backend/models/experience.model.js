import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    location: { type: String, required: true },
    bulletpoint1: { type: String, required: true },
    bulletpoint2: { type: String, required: true },
    bulletpoint3: { type: String, required: true },
});

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;
