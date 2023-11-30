const SupportView = require('../models/SupportView');
const Support = require('../models/Support');
const Agent = require('../models/Agent');

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
        this._support.sendMessage(_agent.getID(), 'Agent', _agent.getName(), message);
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

module.exports = AgentSupportView;