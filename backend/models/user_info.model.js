import mongoose from 'mongoose';

// Structure of collect 
// All this include the information I want to store
const user_infoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    undergraduateSchool: {
        type: String,
        required: true
    },
    undergraduateDegree: {
        type: String,
        required: true
    },
    graduateSchool: {
        type: String,
        required: true
    },
    graduateDegree: {
        type: String,
        required: true
    }
});

// Create the model for User 
const User = mongoose.model('User', user_infoSchema);

export default User;
