import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Gallery from "../models/galleryModel";

export const getAllPhotos = asyncHandler(async (req: Request, res: Response) => {
    const photos = await Gallery.find({});
    return res.status(200).json({ photos });
})

export const uploadPhoto = asyncHandler(async (req: Request, res: Response) => {
    const { title, date, photo } = req.body 
    const isExist = await Gallery.findOne({ title });
    if (isExist) return res.status(409).json({ message: "Photo already exists" })
    await Gallery.create({ title, date, photo });
    return res.status(201).json({ message: "Photo is uploaded successfully" });
})

export const deletePhoto = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await Gallery.findByIdAndDelete(_id);
    return res.status(201).json({ message: "Photo is deleted successfully" });
})