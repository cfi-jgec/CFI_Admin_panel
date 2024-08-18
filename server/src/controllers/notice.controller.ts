import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Notice from "../models/noticeMode";

export const getAllNotices = asyncHandler(async (req: Request, res: Response) => {
    const allNotices = await Notice.find().sort({ date: -1 })
    return res.status(200).json({ allNotices });
})

export const addNotice = asyncHandler(async (req: Request, res: Response) => {
    const reqBody =  req.body
    const { title } = reqBody; 
    const isPresent = await Notice.findOne({ title });
    if (isPresent)
        return res.status(409).json({ message: "notice already exists" });
    await Notice.create(reqBody);
    return res.status(200).json({ message: "notice is created" });
}) 

export const removeNotice = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body
    const { _id } = reqBody;
    await Notice.findByIdAndDelete(_id);
    return res.status(201).json({ message: "notice is deleted" });
})

export const updateNotice = asyncHandler(async (req: Request, res: Response) => {
    const reqBody =req.body 
    const { _id, link, date, description } = reqBody;
    const isPresent = await Notice.findById({ _id });
    if (!isPresent)
        return res.status(404).json({ message: "notice is not exists" });
    await Notice.findByIdAndUpdate(
        isPresent._id,
        { link, date, description },
        { new: true }
    );
    return res.status(200).json({ message: "notice is updated" });
})