const Address = require('../models/Address');
const PaymentCatalog = require('../catalogs/PaymentCatalog');

class Customer{
    constructor(id){
        this._id = id;
        this._name = null;
        this._phone = null;
        this._email = null;
        this._address = null;
        this._paymentCatalog = new this.PaymentCatalog(this._id);
    }

    addPayment(type){
        this._paymentCatalog.addPayment(paymentName,type);
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
    getAddress(){
        return this._address;
    }
    getPaymentCatalog(){
        return this._paymentCatalog;
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
    setAddress(address){
        this._address = address;
    }

    serialize() {
        return JSON.stringify({
            id: this._id,
            name: this._name,
            phone: this._phone,
            email: this._email,
            address: this._address.serialize(),
            paymentCatalog: this._paymentCatalog.serialize(),
        })
    }

    static deserialize(jsonString){
        const data = JSON.parse(jsonString);
        const customer = new Customer(data.id);

        if(data.name){customer._name = data.name;}
        if(data.phone){customer._phone = data.phone;}
        if(data.email){customer._email = data.email;}
        customer._address = Address.deserialize(data.address);
        customer._paymentCatalog = PaymentCatalog.deserialize(data.paymentCatalog);

        return customer;
    }
}

module.exports = Customer;