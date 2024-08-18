import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Stock from "../models/stockModel";


export const getAllStocks = asyncHandler(async (req: Request, res: Response) => {
    const components = await Stock.find({});
    return res.status(200).json({ components });
})

export const addStock = asyncHandler(async (req: Request, res: Response) => {
    const { name, photo, modelNo, qty } = req.body
    const isExisting = await Stock.findOne({ name });
    if (isExisting)
        return res.status(409).json({ message: "Component already exists" });
    await Stock.create({ name, photo, modelNo, qty });
    return res.status(201).json({ message: "Component is added" });
})

export const removeStock = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await Stock.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Component is removed" });
})

export const updateStock = asyncHandler(async (req: Request, res: Response) => {
    const { name, photo, modelNo, qty } = req.body
    const isExisting = await Stock.findOne({ name });
    if (!isExisting)
        return res.status(404).json({ message: "Component doesn't exists" });
    await Stock.findByIdAndUpdate(
        isExisting._id,
        { photo, modelNo, qty },
        { new: true }
    );
    return res.status(201).json({ message: "Component is updated" });
})