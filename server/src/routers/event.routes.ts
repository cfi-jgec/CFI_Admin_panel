import express from "express";
import {
    addEvent,
    approveEventRegistration,
    eventRegister,
    getEventByFields,
    getEventById,
    getEventNames,
    getEventRegistration,
    getEventRegistrationById,
    getEventResult,
    markCompleted,
    removeEvent,
    removeTeamFromEvent,
    updateEvent,
    updateRanks,
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
router.route('/update-result').post(updateRanks);
router.get("/result/:id", getEventResult);

// // team registration
router.route("/register").post(eventRegister);
router.route("/register/teams").get(getEventRegistration);
router.route("/register/teams/:id").get(getEventRegistrationById);
router.route("/register/teams/remove/:id").post(removeTeamFromEvent);
router.route("/register/teams/approval").post(approveEventRegistration);
export default router;
