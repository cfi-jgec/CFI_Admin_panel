import { Request, Response } from "express";
import Event from "../models/eventsModel";
import { asyncHandler } from "../utils/asyncHandler";
import EventRegistration from "../models/eventRegistrationMode";
import { mailer } from "../utils/mailer";

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const event = await Event.findById(id);
    if (!event) res.status(404).json({ message: "event not exists" });
    return res.status(201).json({ event });
})

export const getEventByFields = asyncHandler(async (req: Request, res: Response) => {
    const events = await Event.find({}).sort({ date: 1 });
    return res.status(200).json({ events });
})

export const addEvent = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body
    const { eventId } = reqBody
    const isExist = await Event.findOne({ eventId });
    if (isExist)
        return res.status(409).json({ message: "Event already exist" });
    await Event.create(reqBody);
    return res.status(201).json({ message: "Event is added successfully" });
})

export const removeEvent = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await Event.findByIdAndDelete(_id)
    return res.status(201).json({ message: "Event is deleted" });
})

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body
    const { _id } = reqBody;
    const isExist = await Event.findById(_id);
    if (!isExist)
        return res.status(404).json({ message: "Event is not exist " });
    await Event.findByIdAndUpdate(
        _id,
        reqBody,
        { new: true }
    )
    return res.status(201).json({ message: "Event is updated" });
})

export const markCompleted = asyncHandler(async (req: Request, res: Response) => {
    const { id, isCompleted } = req.body
    await Event.findByIdAndUpdate(id, { isCompleted }, { new: true });
    return res.status(201).json({ message: "Event is completed" });
})

export const eventRegister = asyncHandler(async (req: Request, res: Response) => {
    const { eventId, eventName, teamName, email } = req.body
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not exist" });
    const { date, event_start_time, event_end_time, venue } = event;
    const isTeamExist = await EventRegistration.findOne({ teamName });
    if (isTeamExist) return res.status(409).json({ message: "Team name already exist" });
    await EventRegistration.create(req.body);
    const message = ` 
        <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
            <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 20px;">
                <tr>
                    <td align="center" bgcolor="#4CAF50" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                        Event Registration Confirmation
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 40px 30px 40px 30px;">
                        <p style="font-size: 16px; line-height: 1.6;">Dear ${teamName} team,</p>
                        <p style="font-size: 16px; line-height: 1.6;">
                            Thank you for registering for the <strong>${eventName}</strong> on 
                            <strong>${date}</strong>. We are excited to have you join us!
                        </p>
                        <p style="font-size: 16px; line-height: 1.6;">
                            Here are the details of the event:
                        </p>
                        <ul style="font-size: 16px; line-height: 1.6;">
                            <li><strong>Event:</strong> ${eventName}</li>
                            <li><strong>Date:</strong> ${date}</li>
                            <li><strong>Time:</strong> ${event_start_time} to ${event_end_time}</li>
                            <li><strong>Location:</strong> ${venue}</li>
                        </ul>
                        <p style="font-size: 16px; line-height: 1.6;">
                            If you have any questions or need further assistance, please feel free to contact us at cfi@jgec.ac.in.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6;">
                            Best regards,<br>
                            Event Organizers<br>
                            Centre For Innovation Club JGEC
                        </p>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#4CAF50" style="padding: 30px 30px 30px 30px; color: #ffffff; font-size: 14px;">
                        &copy; 2024 CFI. All rights reserved.
                    </td>
                </tr>
            </table>
        </body> `
    await mailer(email, "Event Registration Confirmation", message);
    return res.status(201).json({ message: "Team is registered successfully" });
})

export const approveEventRegistration = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await EventRegistration.findByIdAndUpdate(_id, { isApproved: true }, { new: true });
    return res.status(201).json({ message: "Event registration is approved" });
})
export const removeTeamFromEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await EventRegistration.findByIdAndDelete(id);
    return res.status(201).json({ message: "Team is removed from event" });
})

export const getEventRegistration = asyncHandler(async (req: Request, res: Response) => {
    const eventRegistration = await EventRegistration.find({})
    return res.status(200).json(eventRegistration);
})

export const getEventNames = asyncHandler(async (req: Request, res: Response) => {
    const eventNames = await Event.find().select("shortName _id");
    return res.status(200).json(eventNames);
})