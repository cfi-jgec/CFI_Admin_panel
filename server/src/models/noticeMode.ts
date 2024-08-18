import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    date: {
        type: String,
        default: Date.now()
    }
})

const Notice =mongoose.models.Notice ||  mongoose.model('Notice', noticeSchema);
export default Notice;