const express = require("express");
const router = express.Router();
const EventLog = require("../models/eventLog"); 

router.post("/log", async (req, res) => {
    try {
        const { eventType, sourceAppId, data } = req.body;

        if (!eventType || !sourceAppId || !data) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const previousLog = await EventLog.findOne().sort({ timestamp: -1 });
        const previousHash = previousLog ? previousLog.hash : "0";

        const newEvent = new EventLog({
            eventType,
            sourceAppId,
            data,
            previousHash,
        });

        newEvent.hash = newEvent.computeHash();

        await newEvent.save();
        res.status(201).json({ message: "Event logged successfully", newEvent });
    } catch (error) {
        console.error("Error while creating event:", error); 
        res.status(500).json({ error: "Failed to log event" });
    }
});

module.exports = router;
