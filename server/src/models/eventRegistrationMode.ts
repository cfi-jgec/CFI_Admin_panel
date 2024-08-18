// import mongoose from "mongoose";

// const eventsRegSchema = new mongoose.Schema(
//     {
//         eventId: String,
//         eventName: String,
//         teamName: String,
//         teamLogo: String,
//         projectName: String,
//         projectDescription: String,
//         leaderName: String,
//         leaderYear: String,
//         leaderBranch: String,
//         phone: String,
//         email: String,
//         members: {
//             name: String,
//             phone: String,
//             branch: String,
//             year: String
//         },
//         isApproved: {
//             type: Boolean,
//             default: false
//         },
//         positions: {
//             type: String,
//             enum: ["1st", "2nd", "3rd", "4th", "5th", "Participation"],
//             default: "Participation"
//         },
//         prize: String,
//         message: String
//     },
//     { timestamps: true }
// );

// const EventRegistration =
//     mongoose.models.EventRegistration ||
//     mongoose.model("EventRegistration", eventsRegSchema);
// export default EventRegistration;

import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const memberSchema = new Schema({
    name: String,
    phone: String,
    branch: String,
    year: String,
});

const eventsRegSchema = new Schema(
    {
        eventId: {
            type: String,
            ref: "Event",
        },
        eventName: String,
        teamName: String,
        teamLogo: String,
        projectName: String,
        projectDescription: String,
        leaderName: String,
        phone: String,
        email: String,
        members: [memberSchema],
        isApproved: {
            type: Boolean,
            default: false,
        },
        positions: {
            type: String,
            enum: ["1st", "2nd", "3rd", "4th", "5th", "Participation"],
            default: "Participation",
        },
        prize: String,
        message: String,
    },
    { timestamps: true }
);

const EventRegistration = model("EventRegistration", eventsRegSchema);
export default EventRegistration;

