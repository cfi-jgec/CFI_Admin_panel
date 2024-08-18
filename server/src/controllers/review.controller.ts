import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Review from "../models/reviewModel";

export const giveReview = asyncHandler(async (req: Request, res: Response) => {
    const { email, message } = req.body
    const isExist = await Review.findOne({ $and: [{ email }, { message }] });
    if (isExist) return res.status(409).json({ message: "Review already exist" });
    await Review.create(req.body);
    return res.status(201).json({ message: "Thank you for your review" });
})

export const getReview = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await Review.find()
    return res.status(200).json({ reviews });
})

export const updateReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    await Review.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(201).json({ message: "Review is updated" });
})

export const acceptReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isAccepted } = req.body;
    await Review.findByIdAndUpdate(id, { isAccepted }, { new: true });
    return res.status(201).json({ message: "Review is accepted" });
})

export const removeReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    await Review.findByIdAndDelete(id)
    return res.status(201).json({ message: "Review is deleted" });
})