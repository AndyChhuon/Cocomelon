class Message {

    constructor(userID, userName, userType, message) {

        //private variables
        this._userID = userID;
        this._userType = userType;
        this._userName = userName;
        this._message = message;
        this._date = new Date();
    }

    // accessors
    getUserID() {
        return this._userID;
    }
    getUserType() {
        return this._userType;
    }
    getUserName() {
        return this._userName;
    }
    getMessage() {
        return this._message;
    }
    getDate() {
        return this._date;
    }

    // methods for storing and recovering objects instances
    serialize() {
        return JSON.stringify({
            userID: this._userID,
            userType: this._userType,
            userName: this._userName,
            message: this._message,
            date: this._date.toJSON(),
        });
    }
    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const _instance = new Message(data.userID, data.userName, data.userType, data.message);

        _instance._date = new Date(data.date);

        return _instance;
    }
}

module.exports = Message;