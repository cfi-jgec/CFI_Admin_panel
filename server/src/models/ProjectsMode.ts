import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    files: [String],
    liveLink: String,
    studentName: String,
    mobile: String,
    email: String,
    branch: String,
    year: String,
    college: String,
    isApproved: {
        type: Boolean,
        default: false
    },
    message: String,
}, { timestamps: true }); 

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
