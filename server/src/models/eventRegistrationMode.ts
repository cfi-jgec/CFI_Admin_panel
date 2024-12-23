
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
        rank: Number,
        message: String,
    },
    { timestamps: true }
);

const EventRegistration = model("EventRegistration", eventsRegSchema);
export default EventRegistration;

