const PaymentFactory = require('../factories/PaymentFactory');
const Payment = require('../models/Payment');
const PaypalPayment = require('../models/PaypalPayment');
const CreditPayment = require('../models/CreditPayment');

class PaymentCatalog{
    constructor(id){
        this._id = id;
        this._payments = new Map();
    }
    addPayment(paymentName, paymentType){
        newPayment = PaymentFactory.createPayment(paymentType, data); // object literal for data
        this._payments.set(paymentName, newPayment);
    }
    getPayment(paymentName){
        if(!this._payments.get(paymentName)){
            throw new Error("No such payment found.")
        }
        return this._payments.get(paymentName);
    }
    removePayment(paymentName){
        if(!this._payments.get(paymentName)){
            throw new Error("No such payment found.")
        }
        let payment = this._payments.get(paymentName);
        this._payments.delete(paymentName);
        return payment;
    }

    serialize(){
        const serializedPayments = Array.from(this._payments.values(), payment => payment.serialize());
        return JSON.stringify({
            payments: serializedPayments,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedPayments = data.payments.map(paymentData => Payment.deserialize(paymentData));

        this._payments = new Map(deserializedPayments.map(payment => [payment.getName(), payment]));
    }
}

module.exports = PaymentCatalog;