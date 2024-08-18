import Event from "../models/eventsModel";
import Gallery from "../models/galleryModel";
import Contact from "../models/helpModel";
import Notice from "../models/noticeMode";
import Project from "../models/ProjectsMode";
import Review from "../models/reviewModel";
import Stock from "../models/stockModel";
import { asyncHandler } from "../utils/asyncHandler";

export const allCount = asyncHandler(async (req, res) => {
    const notices = await Notice.find().countDocuments();
    const reviews = await Review.find().countDocuments();
    const events = await Event.find().countDocuments();
    const projects = await Project.find().countDocuments();
    const alerts = await Contact.find().countDocuments();
    const stocks = await Stock.find().countDocuments();
    const galleries= await Gallery.find().countDocuments();
    return res.status(200).json({ notices, reviews, events, projects, alerts, stocks, galleries });
});