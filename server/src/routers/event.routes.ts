import express from "express";
import {
    addEvent,
    approveEventRegistration,
    eventRegister,
    getEventByFields,
    getEventById,
    getEventNames,
    getEventRegistration,
    markCompleted,
    removeEvent,
    removeTeamFromEvent,
    updateEvent,
} from "../controllers/event.controller";

const router = express.Router();

// create and update event
router.route("/:id").get(getEventById);
router.route("/").get(getEventByFields);
router.route("/mark-completed").post(markCompleted);
router.route("/add").post(addEvent);
router.route("/remove").post(removeEvent);
router.route("/update").post(updateEvent);
router.route('/event/names').get(getEventNames);

// // team registration
router.route("/register").post(eventRegister);
router.route("/register/teams").get(getEventRegistration);
router.route("/register/teams/remove/:id").post(removeTeamFromEvent);
router.route("/register/teams/approval").post(approveEventRegistration);
export default router;
