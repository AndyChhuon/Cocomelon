const Order = require('../models/Order');

class OrderCatalog{
    static _instance;
    static _orderCount;

    static getInstance(){
        if (!OrderCatalog._instance){
            OrderCatalog._instance = new OrderCatalog();
        }
        return OrderCatalog._instance;
    }

    constructor() {
        if (OrderCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.")
        }
        this._orders = new Map();
        this._orderCount = 0;
    }

    addOrder(customerID, quotationID){
        let newOrderID = this._orderCount++;
        let order = new Order(newOrderID, customerID, quotationID);
        this._orders.set(newOrderID, order);
        return order;
    }

    getOrder(orderID) {
        if (!this._orders.get(orderID)){
            throw new Error("Invalid Order! Order not Found.");
        }
        return this._orders.get(orderID);
    }

    removeOrder(orderID){
        if (!this._orders.get(orderID)){
            throw new Error("Invalid Order! Order not Found.");
        }
        let order = this._orders.get(orderID);
        this._orders.delete(orderID);
        return order;
    }

    serialize(){
        const serializedOrders = Array.from(this._orders.values(), order => order.serialize());
        return JSON.stringify({
            orderCount: this._orderCount,
            orders: serializedOrders,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedOrders = data.orders.map(orderData => Order.deserialize(orderData));

        this._orders = new Map(deserializedOrders.map(order => [order.getID(), order]));
        this._orderCount = data.orderCount;
    }
}

module.exports = OrderCatalog;