class User {
    constructor(id, type) {
        this._id = id;
        this._type = type;
    }

    getID() {
        return this._id;
    }

    getType() {
        return this._type;
    }
}

module.exports = User;
