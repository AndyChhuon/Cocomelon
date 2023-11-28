const Message = require('../models/Message');

class Chat {
    constructor() {
        // private variables
        this._messages = [];
    }

    // Chat control methods
    addMessage(uID, uName, uType, message) {
        let m = new Message(uID, uName, uType, message);
        this._messages.push(m);
    }
    getMessages() {
        return this._messages;
    }

    // methods for storing and recovering objects instances
    serialize() {
        const serializedMessages = this._messages.map(message => message.serialize());
        return JSON.stringify({
            messages: serializedMessages,
        });
    }
    deserialize(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            const deserializedMessages = data.messages.map(messageData => Message.deserialize(messageData));
            this._messages = deserializedMessages;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
}

module.exports = Chat;