import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    photo: String,
    name: String,
    modelNo: String,
    qty: {
        type: Number,
        default: 1
    },
}, { timestamps: true })

const Stock = mongoose.models.Stock || mongoose.model('Stock', stockSchema);
export default Stock;