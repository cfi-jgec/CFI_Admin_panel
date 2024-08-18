import mongoose, { InferSchemaType } from 'mongoose';

const gallerySchema = new mongoose.Schema({
    title: String,
    date: String,
    photo: String,
}, { timestamps: true })

type galleryType = InferSchemaType<typeof gallerySchema>;

const Gallery = mongoose.models.Gallery || mongoose.model<galleryType>('Gallery', gallerySchema);
export default Gallery;