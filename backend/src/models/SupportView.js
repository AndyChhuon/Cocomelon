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
        this._support.sendMessage(user.getUserID, user.getUserType, user.getUserName, message);
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

class AgentSupportView extends SupportView {
    constructor (agent, support) {

        if (agent.getUserType != 'Agent') {
            throw new Error("This type of user does not have access to this functionality");
        }

        super();

        // private variables
        this._agent = agent;
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
        this._support.sendMessage(user.getUserID, user.getUserType, user.getUserName, message);
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