const Transaction = require('../models/Transaction');

class TransactionCatalog{
    static _instance;
    static _transactionCount;

    static getInstance(){
        if (!TransactionCatalog._instance){
            TransactionCatalog._instance = new TransactionCatalog();
        }
        return TransactionCatalog._instance;
    }

    constructor() {
        if (TransactionCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.")
        }
        this._transactions = new Map();
        this._transactionCount = 0;
    }

    addTransaction(customerID, quotationID){
        let newTransactionID = this._transactionCount++;
        let transaction = new Transaction(newTransactionID, customerID, quotationID);
        this._transactions.set(newTransactionID, transaction);
        return transaction;
    }

    getTransaction(transactionID) {
        if (!this._transactions.get(transactionID)){
            throw new Error("Invalid Transaction! Transaction not Found.");
        }
        return this._transactions.get(transactionID);
    }

    removeTransaction(transactionID){
        if (!this._transactions.get(transactionID)){
            throw new Error("Invalid Transaction! Transaction not Found.");
        }
        let transaction = this._transactions.get(transactionID);
        this._transactions.delete(transactionID);
        return transaction;
    }

    serialize(){
        const serializedTransactions = Array.from(this._transactions.values(), transaction => transaction.serialize());
        return JSON.stringify({
            transactionCount: this._transactionCount,
            transactions: serializedTransactions,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedTransactions = data.transactions.map(transactionData => Transaction.deserialize(transactionData));

        this._transactions = new Map(deserializedTransactions.map(transaction => [transaction.getID(), transaction]));
        this._transactionCount = data.transactionCount;
    }
}

module.exports = TransactionCatalog;