const Customer = require('../models/Customer');

class CustomerCatalog {
    static _instance;

    static getInstance(){
        if (!CustomerCatalog._instance){
            CustomerCatalog._instance = new CustomerCatalog();
        }
        return CustomerCatalog._instance;
    }

    constructor() {
        if (CustomerCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.")
        }
        this._customers = new Map();
    }

    addCustomer(userID){
        let customer = new Customer(userID);
        this._customers.set(userID, customer);
        return customer;
    }

    getCustomer(customerID) {
        if (!this._customers.get(customerID)){
            throw new Error("Invalid Customer! Customer not Found.");
        }
        return this._customers.get(customerID);
    }

    removeCustomer(customerID){
        if (!this._customers.get(customerID)){
            throw new Error("Invalid Customer! Customer not Found.");
        }
        let customer = this._customers.get(customerID);
        this._customers.delete(customerID);
        return customer;
    }

    serialize(){
        const serializedCustomers = Array.from(this._customers.values(), customer => customer.serialize());
        return JSON.stringify({
            customers: serializedCustomers,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedCustomers = data.customers.map(customerData => Customer.deserialize(customerData));

        this._customers = new Map(deserializedCustomers.map(customer => [customer.getID(), customer]));
    }
}

module.exports = CustomerCatalog;