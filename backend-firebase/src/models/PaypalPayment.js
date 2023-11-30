const Payment = require('../models/Payment');

class PaypalPayment extends Payment{
    constructor({name, email}){
        super();
        this._name = name;
        this._email = email;
    }
    makePayment (amount) {
        // TODO : makePayment logic
    }
    getName(){
        return this._name;
    }

    serialize(){
        return JSON.stringify({
            name: this._name,
            email: this._email,
        })
    }

    static deserialize(jsonString){
        const data = JSON.parse(jsonString);
        let name = data.name;
        let email = data.email;
        const paypalPayment = new PaypalPayment({name, email});

        return paypalPayment;
    }
}

module.exports = PaypalPayment;