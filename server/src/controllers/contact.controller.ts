import { Request, Response } from "express";
import Help from "../models/helpModel";
import { mailer } from "../utils/mailer";
import { asyncHandler } from "../utils/asyncHandler";


export const getAllQuery= asyncHandler(async (req: Request, res: Response) => {
    const allRes = await Help.find();
    return res.status(200).json({ allRes, message: "Response is get successfully" })
})

export const createQuery = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body
    const { email, message } = reqBody;
    const findRes = await Help.findOne({ $and: [{ email, message }] })
    if (findRes) return res.status(409).json({ message: "Already submit the message" })
    await Help.create(reqBody);
    return res.status(201).json({ message: "Response is stored successfully" });
})

export const resolve = asyncHandler(async (req: Request, res: Response) => {
    const { _id, email, solution } = req.body
    const isSolved = await Help.findOne({ $and: [{ email, solution }] }); 
    if (isSolved) return res.status(409).json({ message: "Query is already resolved" })
    const query = await Help.findById({ _id })
    const { name, message } = query;
    if (solution) {
        await Help.findByIdAndUpdate(_id, {
            solution,
            status: true,
        }, { new: true });
        let resMessage = `
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
                    <div style="padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
                        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
                            <p style="font-size: 16px; color: #333333;">
                                Dear <span style="font-weight: bold;">${name}</span>,
                            </p>

                            <p style="font-size: 16px; color: #333333;">
                                Thank you for reaching out to us with your query. Below is the response to your question:
                            </p>

                            <div style="border-left: 4px solid #007bff; padding-left: 10px; margin: 20px 0; background-color: #f1f8ff;">
                                <p style="font-size: 16px; color: #333333; margin: 0;">
                                    <strong>Original Query:</strong> <em>${message}</em>
                                </p>
                            </div>

                            <p style="font-size: 16px; color: #333333;">
                                <strong>Response:</strong> <b>${solution}</b>
                            </p>

                            <p style="font-size: 16px; color: #333333;">
                                If you have any further questions or need additional assistance, please feel free to reply to this email.
                            </p>

                            <div style="font-size: 16px; color: #333333;">
                                Best regards, <br/>
                                Center For Innovation Club <br/>
                                Jalpaiguri Government Engineering College
                            </div> 
                        </div>
                    </div>
                </body>`
        await mailer(email, `Your query is resolved`, resMessage)
    }
    return res.status(201).json({ message: "Solution is Saved successfully" });
})

export const deleteQuery = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await Help.findByIdAndDelete(_id);
    return res.status(201).json({ message: "query deleted successfully" });
})