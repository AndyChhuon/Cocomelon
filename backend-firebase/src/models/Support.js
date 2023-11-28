const SupportStatus = require('../enums/SupportStatus');
const Subject = require('../models/Subject')
const Chat = require('../models/Chat');
const AgentSupportView = require('../models/AgentSupportView');
const UserSupportView = require('../models/UserSupportView');

class Support extends Subject {
    constructor(supportID, order, user, issue) {
        super();

        // private variables
        this._supportID = supportID;
        this._order = order;
        this._user = user;
        this._issue = issue;
        this._status = SupportStatus[0];
        this._agents = [];
        this._observers = [];
        this._chat = new Chat();
    }

    // Observer control methods
    addObserver(observer) {
        this._observers.push(observer);
    }
    removeObserver(observer) {
        const index = this._observers.indexOf(observer);
        if (index !== -1) {
            this._observers.splice(index, 1);
        }
    }
    notifyObservers() {
        for (let i = 1; i <= this._observers.length; i++) {
            this._observers.getObserver(i).update();
        }
    }
    getObserver(index) {
        return this._observers[index];
    }
    addAgent(agent) {
        this._agents.push(agent);
        let agentViewSupport = new AgentSupportView();
        return agentViewSupport;
    }
    getUserSupportView () {
        if (this._observers.length == 0){
            let userSupportView = new UserSupportView();
            return userSupportView;
        }
        return this._observers[1];
    }

    // accessors
    getSupportID() {
        return this._supportID;
    }
    getUser() {
        return this._user;
    }
    getAgents() {
        return this._agents;
    }
    getOrder() {
        return this._order;
    }
    getChat() {
        return this._chat;
    }
    getObservers() {
        return this._observers;
    }
    getStatus() {
        return this._status;
    }
    setStatus(status) {
        this._status = status;
    }
    

    // Chat control method
    sendMessage(userID, userType, userName, message) {
        this._chat.addMessage(userID, userType, userName, message);
    }

    // methods for storing and recovering objects instances
    serialize() {
        return JSON.stringify({
            supportID: this._supportID,
            order: this._order,
            user: this._user,
            issue: this._issue,
            status: this._status,
            agents: this._agents,
            observers: this._observers,
            chat: this._chat.serialize(),
        });
    }
    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const support = new Support(data.supportID, data.order, data.user, data.issue);

        support._status = data.status;
        support._agents = data.agents;
        support._observers = data.observers;
        support._chat = Chat.deserialize(data.chat);

        return support;
    }
}

module.exports = Support;

