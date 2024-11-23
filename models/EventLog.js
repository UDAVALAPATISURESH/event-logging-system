const mongoose = require("mongoose");
const crypto = require("crypto");

const EventLogSchema = new mongoose.Schema({
    eventType: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    sourceAppId: { type: String, required: true },
    data: { type: Object, required: true },
    hash: { type: String, required: true },
    previousHash: { type: String, required: true },
});


EventLogSchema.methods.computeHash = function () {
    const dataString = `${this.eventType}${this.timestamp}${this.sourceAppId}${JSON.stringify(
        this.data
    )}${this.previousHash}`;
    return crypto.createHash("sha256").update(dataString).digest("hex");
};

module.exports = mongoose.model("EventLog", EventLogSchema);
