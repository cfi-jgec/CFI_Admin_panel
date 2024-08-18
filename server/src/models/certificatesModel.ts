import mongoose, { InferSchemaType, model } from 'mongoose';

const certificateSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    categoryList: Array
})
type CertificateType = InferSchemaType<typeof certificateSchema>;
const Certificate = mongoose.models.certificate || model<CertificateType>('certificate', certificateSchema);
export default Certificate;