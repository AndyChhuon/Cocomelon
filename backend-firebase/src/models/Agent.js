class Agent{
    constructor(id){
        this._id = id;
        this._name = null;
        this._phone = null;
        this._email = null;
    }
    getID(){
        return this.id;
    }
    getName(){
        return this._name;
    }
    getPhone(){
        return this._phone;
    }
    getEmail(){
        return this._email;
    }
    setName(name){
        this._name = name;
    }
    setPhone(phone){
        this._phone = phone;
    }
    setEmail(email){
        this._email = email;
    }

    serialize() {
        return JSON.stringify({
            id: this._id,
            name: this._name,
            phone: this._phone,
            email: this._email,
        })
    }

    static deserialize(jsonString){
        const data = JSON.parse(jsonString);
        const agent = new Agent(data.id);

        if(data.name){agent._name = data.name;}
        if(data.phone){agent._phone = data.phone;}
        if(data.email){agent._email = data.email;}
        return agent;
    }
}

module.exports = Agent;