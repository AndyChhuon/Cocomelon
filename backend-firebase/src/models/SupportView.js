const Observer = require('../models/Observer')

class SupportView extends Observer{
    display () {
        throw new Error("display() not defined.");
    }
    sendMessage (message) {
        throw new Error("sendMessage() not defined.");
    }
    closeIssue () {
        throw new Error("closeIssue() not defined.");
    }
    openIssue () {
        throw new Error("openIssue() not defined.");
    }
}

module.exports = SupportView;