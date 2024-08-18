
import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
    eventId: String,
    date: String,
    description: String,
    event_end_time: String,
    event_start_time: String,
    fullName: String,
    organizer: String,
    photo: String,
    prizes: String,
    reg_date_end: String,
    reg_date_start: String,
    rules: String,
    shortName: String,
    venue: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventsSchema);
export default Event;
