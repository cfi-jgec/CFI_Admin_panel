import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Certificate from "../models/certificatesModel";


export const createFolder = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.body  
    const folder = await Certificate.findOne({ category }); 
    if (folder) return res.status(409).json({ message: "Folder already exists" });
    await Certificate.create({ category });
    return res.status(200).json({ message: "folder created" });
})

export const deleteFolder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body
    await Certificate.findByIdAndDelete(id);
    return res.status(201).json({ message: "folder deleted successfully" });
})

export const getAllFolders = asyncHandler(async (req: Request, res: Response) => {
    const list = await Certificate.find();
    return res.status(200).json({ list, message: "Category found successfully" });
})

// For upload certificate
export const uploadCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { category, uploadList } = req.body
    const event = await Certificate.findOne({ category });
    if (event) {
        for (let i = 0; i < uploadList.length; i++) {
            event.categoryList.push(uploadList[i]);
        }
        await event.save();
    }
    const list = await Certificate.findOne({ category });
    return res.status(200).json({ list, message: "Certificates uploaded" });
})

export const deleteCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { category, item } = req.body
    await Certificate.findOneAndUpdate(
        { category },
        { $pull: { categoryList: { refId: item.refId } } }
    );
return res.status(201).json({ message: "Certificate is deleted" });
})

export const getCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.body
    // console.error(category);
    const list = await Certificate.findOne({ category });
    if (!list) return res.status(404).json({ message: "Could not find certificate" });
    return res.status(201).json({ item: list.categoryList, message: "Certificates found successfully" });
})
