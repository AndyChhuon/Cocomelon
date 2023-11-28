const Agent = require('../models/Agent');

class AgentCatalog {
    static _instance;

    static getInstance(){
        if (!AgentCatalog._instance){
            AgentCatalog._instance = new AgentCatalog();
        }
        return AgentCatalog._instance;
    }

    constructor() {
        if (AgentCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.")
        }
        this._agents = new Map();
    }

    addAgent(userID){
        let agent = new Agent(userID);
        this._agents.set(userID, agent);
        return agent;
    }

    getAgent(agentID) {
        if (!this._agents.get(agentID)){
            throw new Error("Invalid Agent! Agent not Found.");
        }
        return this._agents.get(agentID);
    }

    removeAgent(agentID){
        if (!this._agents.get(agentID)){
            throw new Error("Invalid Agent! Agent not Found.");
        }
        let agent = this._agents.get(agentID);
        this._agents.delete(agentID);
        return agent;
    }

    serialize(){
        const serializedAgents = Array.from(this._agents.values(), agent => agent.serialize());
        return JSON.stringify({
            agents: serializedAgents,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedAgents = data.agents.map(agentData => Agent.deserialize(agentData));

        this._agents = new Map(deserializedAgents.map(agent => [agent.getID(), agent]));
    }
}

module.exports = AgentCatalog;