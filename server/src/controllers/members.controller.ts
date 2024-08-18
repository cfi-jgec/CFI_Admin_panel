import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Member from "../models/membersModel";


export const getAllMembers = asyncHandler(async (req: Request, res: Response) => {
    const members = await Member.find({});
    return res.status(200).json({ members });
})

export const getAlumniMembers = asyncHandler(async (req: Request, res: Response) => {
    const year = new Date().getFullYear(); 
    const members = await Member.find({ year: { $lte: String(year) } }).select("year");
    return res.status(200).json({ members });
}) 

export const getMemberByYear = asyncHandler(async (req: Request, res: Response) => {
    const { year } = req.params;
    const members = await Member.find({ year });
    return res.status(200).json({ members });
})

export const addMember = asyncHandler(async (req: Request, res: Response) => {
    const { name, photo, position, year, dept, email, phone, facebook, instagram, linkedin } = req.body
    const isExist = await Member.findOne({ email });
    if (isExist)
        return res.status(404).json({ message: "User already exist" });
    await Member.create({ name, photo, position, year, dept, email, phone, socialLinks: { facebook, instagram, linkedin } });
    return res.status(200).json({ message: "Member is added" });
})

export const removeMember = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await Member.findByIdAndDelete(_id);
    return res.status(201).json({ message: "Member is removed successfully" });
})

export const updateMember = asyncHandler(async (req: Request, res: Response) => {
    const { name, photo, position, year, dept, email, phone, facebook, instagram, linkedin } = req.body
    const isExist = await Member.findOne({ email });
    if (!isExist)
        return res.status(404).json({ message: "User is not exist in our team" });
    await Member.findByIdAndUpdate(isExist._id, { name, photo, position, year, dept, phone, socialLinks: { facebook, instagram, linkedin } }, { new: true })
    return res.status(201).json({ message: "Member details is updated" });
})