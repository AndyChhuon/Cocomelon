const OrderStatus = require('../enums/OrderStatus');

class Order{
    constructor(id, customerID, quotationID){
        this._id = id;
        this._customerID = customerID;
        this._quotationID = quotationID;
        this._carrierID = null;
        this._transactionID = null;
        this._status = OrderStatus[1];
    }
    getID(){
        return this.id;
    }
    getCustomerID(){
        return this._customerID;
    }
    getQuotationID(){
        return this._quotationID;
    }
    getCarrierID(){
        return this._carrierID;
    }
    getTransactionID(){
        return this._transactionID;
    }
    getStatus(){
        return this._status;
    }
    setCarrierID(carrierID){
        this._carrierID = carrierID;
    }
    setTransactionID(transactionID){
        this._transactionID = transactionID;
    }
    setStatus(status){
        this._status = status;
    }
    

    serialize() {
        return JSON.stringify({
            id: this._id,
            customerID: this._customerID,
            quotationID: this._quotationID,
            carrierID: this._carrierID,
            transactionID: this._transactionID,
            status: this._status,
        });
    }

    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const order = new Order(data.id, data.customerID, data.quotationID);
        if(data.carrierID){order.setCarrierID(data.carrierID);}
        if(data.transactionID){order.setTransactionID(data.transactionID);}
        order.setStatus(data.status);

        return order;
    }
}

module.exports = Order;