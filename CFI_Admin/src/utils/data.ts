
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";


export const positions: string[] = ['---Select---', 'Secretary', "Cashier", 'Head of Business Development', 'Project Management Head', "Web Lead", "Social Media Team", "Technical Team", "Tech Head", "Stock Head","Content Head"]
export const years: (string | number)[] = ['---Select---', 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,2026,2027,2028,2029,2030]
export const departments: string[] = ['---Select---', 'CSE', 'IT', 'ECE', 'EE', 'ME', 'CE']
export const socialIcons: string[] = ['---Select---', 'facebook', 'instagram', 'linkedin', 'twitter']
export const eventCategories: string[] = ['---Select---', 'ICIC-2023', "ICIC-2024", "ICICIC-2025"]
export const Status: string[] = ["---Select---", "resolved", "pending"]

export const fileToUrlLink = async (file: File, fileType: string) => {
    if (file) {
        const fileRef = ref(storage, `${fileType}/${v4() + file.name}`);
        const res = await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(res.ref);
        return fileUrl;
    }
    else console.log('Invalid file');
}

export const deleteStorage = async (fileUrl: string) => {
    try {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);
        toast.success('File removed from storage');
    } catch (error) {
        console.error('Error deleting file:', error);
        toast.error('File not removed from storage');
    }
}
