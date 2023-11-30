const SupportView = require('../models/SupportView');
const Support = require('../models/Support');
const User = require('../models/User');

class UserSupportView extends SupportView {
    constructor (user, support) {
        super();

        // private variables
        this._user = user;
        this._support = support;
        this._status = support.getStatus();
        this._chatHistory = support.getChat();

        // provides this observer to the support object it observes
        this._support.addObserver(this);
    }

    // provides appropriate display for chat
    display () {
    }

    // Support Control Method
    sendMessage (message) {
        this._support.sendMessage(_user.getUserID(), _user.getUserType(), _user.getUserName(), message);
        this._support.notifyObservers();
    }
    closeIssue () {
        if (this._support.getStatus == 'Resolved') {
            throw new Error("This Support issue has already been resolved.");
        }
        this._support.setStatus('Resolved');
        this._support.notifyObservers();
    }
    openIssue () {
        if (this._support.getStatus == 'Unresolved') {
            throw new Error("This Support issue is already open.");
        }
        this._support.setStatus('Unresolved');
        this._support.notifyObservers();
    }

    // Observer Control Method
    update () {
        this._chatHistory = this._support.getChat();
        this._status = this._support.getStatus();
        this.display();
    }
}

module.exports = UserSupportView;