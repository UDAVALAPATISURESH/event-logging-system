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
        console.error("Error while logging event:", error);
        res.status(500).json({ error: "Failed to log event" });
    }
});


router.get("/logs", async (req, res) => {
    try {
        const { eventType, sourceAppId, startDate, endDate } = req.query;

        let query = {};
        if (eventType) query.eventType = eventType;
        if (sourceAppId) query.sourceAppId = sourceAppId;
        if (startDate || endDate) {
            query.timestamp = {};
            if (startDate) query.timestamp.$gte = new Date(startDate);
            if (endDate) query.timestamp.$lte = new Date(endDate);
        }

        const logs = await EventLog.find(query).sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error while fetching logs:", error);
        res.status(500).json({ error: "Failed to fetch logs" });
    }
});

module.exports = router;
