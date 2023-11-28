const PaypalPayment = require('../models/PaypalPayment');
const CreditPayment = require('../models/CreditPayment');
const PaymentType = require('../enums/PaymentType');

class PaymentFactory {
    static _instance;

    static getInstance(){
        if (!PaymentFactory._instance){
            PaymentFactory._instance = new PaymentFactory();
        }
        return PaymentFactory._instance;
    }

    constructor() {
        if (PaymentFactory._instance) {
            throw new Error("Singleton class, use getInstance method.")
        }
    }

    static createPayment(type, data){
        if (!PaymentType.includes(type)){
            throw new Error("Invalid User Type. Options : paypal, credit");
        }
        switch(type){
            case PaymentType[0]:
                return new PaypalPayment(data);
                break;
            case PaymentType[1]:
                return new CreditPayment(data);
                break;
        }
    }
}

module.exports = PaymentFactory;