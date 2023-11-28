const Payment = require('../models/Payment');

class CreditPayment extends Payment{
    constructor({name, nameOnCard, cardNumber, expirationDate, cvv}) {
        super();
        this._name = name;
        this._nameOnCard = nameOnCard;
        this._cardNumber = cardNumber;
        this._expirationDate = expirationDate;
        this._cvv = cvv;
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
            nameOnCard : this._nameOnCard,
            cardNumber : this._cardNumber,
            expirationDate : this._expirationDate,
            cvv : this._cvv,
        })
    }

    static deserialize(jsonString){
        const data = JSON.parse(jsonString);
        let name = data.name;
        let nameOnCard = data.nameOnCard;
        let cardNumber = data.cardNumber;
        let expirationDate = data.expirationDate;
        let cvv = data.cvv;
        const paypalPayment = new PaypalPayment({name, nameOnCard, cardNumber, expirationDate, cvv});

        return paypalPayment;
    }
}

module.exports = CreditPayment;