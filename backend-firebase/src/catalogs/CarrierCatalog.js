const Carrier = require('../models/Carrier');

class CarrierCatalog {
    static _instance;

    static getInstance(){
        if (!CarrierCatalog._instance){
            CarrierCatalog._instance = new CarrierCatalog();
        }
        return CarrierCatalog._instance;
    }

    constructor() {
        if (CarrierCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.")
        }
        this._carriers = new Map();
    }

    addCarrier(userID){
        let carrier = new Carrier(userID);
        this._carriers.set(userID, carrier);
        return carrier;
    }

    getCarrier(carrierID) {
        if (!this._carriers.get(carrierID)){
            throw new Error("Invalid Carrier! Carrier not Found.");
        }
        return this._carriers.get(carrierID);
    }

    removeCarrier(carrierID){
        if (!this._carriers.get(carrierID)){
            throw new Error("Invalid Carrier! Carrier not Found.");
        }
        let carrier = this._carriers.get(carrierID);
        this._carriers.delete(carrierID);
        return carrier;
    }

    serialize(){
        const serializedCarriers = Array.from(this._carriers.values(), carrier => carrier.serialize());
        return JSON.stringify({
            carriers: serializedCarriers,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedCarriers = data.carriers.map(carrierData => Carrier.deserialize(carrierData));

        this._carriers = new Map(deserializedCarriers.map(carrier => [carrier.getID(), carrier]));
    }
}

module.exports = CarrierCatalog;