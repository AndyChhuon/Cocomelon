const Quotation = require('../models/Quotation');

class QuotationCatalog {
    static _instance;
    static _quotationCount;

    static getInstance() {
        if (!QuotationCatalog._instance) {
            QuotationCatalog._instance = new QuotationCatalog();
        }
        return QuotationCatalog._instance;
    }

    constructor() {
        if (QuotationCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.");
        }
        this._quotations = new Map();
        this._quotationCount = 0;
    }

    addQuotation(src, dst, pkg) {
        let newQuotationID = this._quotationCount++;
        let quotation = new Quotation(newQuotationID, src, dst, pkg);
        this._quotations.set(newQuotationID, quotation);
        return quotation;
    }

    getQuotation(quotationID) {
        if (!this._quotations.get(quotationID)) {
            throw new Error("Invalid Quotation! Quotation not Found.");
        }
        return this._quotations.get(quotationID);
    }

    removeQuotation(quotationID) {
        if (!this._quotations.get(quotationID)) {
            throw new Error("Invalid Quotation! Quotation not Found.");
        }
        let quotation = this._quotations.get(quotationID);
        this._quotations.delete(quotationID);
        return quotation;
    }

    serialize() {
        const serializedQuotations = Array.from(this._quotations.values(), quotation => quotation.serialize());
        return JSON.stringify({
            quotationCount: this._quotationCount,
            quotations: serializedQuotations,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedQuotations = data.quotations.map(quotationData => Quotation.deserialize(quotationData));

        this._quotations = new Map(deserializedQuotations.map(quotation => [quotation.getID(), quotation]));
        this._quotationCount = data.quotationCount;
    }
}

module.exports = QuotationCatalog;
