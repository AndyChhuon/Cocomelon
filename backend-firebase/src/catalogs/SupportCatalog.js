const Support = require('../models/Support');

class SupportCatalog {

    // singleton pattern
    static _instance;
    
    static getInstance() {
        if (!SupportCatalog._instance) {
            SupportCatalog._instance = new SupportCatalog();
        }
        return SupportCatalog._instance;
    }

    constructor() {
        // to prevent further creation of SupportCatalog instances
        if (SupportCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.");
        }

        this._supports = new Map();
    }

    // Support control method
    addSupport(order, user, issue) {
        let newSupportID = this._supports.size + 1;
        let support = new Support(newSupportID, order, user, issue);
        this._supports.set(newSupportID, support);
        return support;
    }
    getSupport(supportID) {
        return this._supports.get(supportID);
    }

    // method for storing and recovering objects instances
    serialize() {
        const serializedSupports = Array.from(this._supports.values(), support => support.serialize());
        return JSON.stringify({
            supports: serializedSupports,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedSupports = data.supports.map(supportData => Support.deserialize(supportData));

        this._supports = new Map(deserializedSupports.map(support => [support.getSupportID(), support]));
    }
}

module.exports = SupportCatalog;