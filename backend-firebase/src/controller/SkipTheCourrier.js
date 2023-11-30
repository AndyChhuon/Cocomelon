const admin = require("firebase-admin");
const PackageCatalog = require('../catalogs/PackageCatalog');
const UserCatalog = require('../catalogs/UserCatalog');
const AgentCatalog = require('../catalogs/AgentCatalog');
const CarrierCatalog = require('../catalogs/CarrierCatalog');
const CustomerCatalog = require('../catalogs/CustomerCatalog');
const QuotationCatalog = require('../catalogs/QuotationCatalog');
const OrderCatalog = require('../catalogs/OrderCatalog');
const TransactionCatalog = require('../catalogs/TransactionCatalog');
const SupportCatalog = require('../catalogs/SupportCatalog');
const ReviewCatalog = require('../catalogs/ReviewCatalog');
const Size = require('../models/Size');
const Weight = require('../models/Weight');


class SkipTheCourrier{
    static _instance;

    static getInstance(){
        if (!SkipTheCourrier._instance){
            SkipTheCourrier._instance = new SkipTheCourrier();
        }
        return SkipTheCourrier._instance;
    }

    constructor(){
        this._userCatalog = UserCatalog.getInstance();
        this._agentCatalog = AgentCatalog.getInstance();
        this._carrierCatalog = CarrierCatalog.getInstance();
        this._customerCatalog = CustomerCatalog.getInstance();
        this._packageCatalog = PackageCatalog.getInstance();
        this._quotationCatalog = QuotationCatalog.getInstance();
        this._orderCatalog = OrderCatalog.getInstance();
        this._transactionCatalog = TransactionCatalog.getInstance();
        this._supportCatalog = SupportCatalog.getInstance();
        this._reviewCatalog = ReviewCatalog.getInstance();
        let parseAddress = function (address){
            //logic to parse address and return Address object
        }
        let createSize = function (lengthCm, widthCm, heightCm){
            return new Size(lengthCm, widthCm, heightCm);
        }
        let createWeight = function (weightKg){
            return new Weight(weightKg)
        }
        let createPackage = function (size, weight){
            return this._packageCatalog.addPackage(size, weight);
        }
        let createQuotation = function (src, dst, pkg){
            return this._quotationCatalog.addQuotation(src, dst, pkg);
        }
        let createOrder = function (customerID, quotationID){
            return this._orderCatalog.addOrder(customerID, quotationID);
        }
        let fetchCustomerPayment = function (customerID, paymentName){
            let customer = this._customerCatalog.getCustomer(customerID);
            let paymentCatlaog = customer.getPaymentCatalog();
            return paymentCatlaog.getPayment(paymentName);
        }
        let createTransaction = function (customerID, quotationID){
            return this._transactionCatalog.addTransaction(customerID, quotationID);
        }
        let createSupport = function (userID, orderID, issue){
            return this._supportCatalog.addSupport(userID, orderID, issue);
        }
        let createUserSupportView = function (user, support){
            return new UserSupportView(user, support);
        }
        let createReview = function (comment, rating){
            return this._reviewCatalog.addRevier(rating, comment);
        }
    }

    async signUp(idToken, accountType, name, password) {
        // Verify the ID token and get user's Firebase UID
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userUid = decodedToken.uid;

        // Check if the user already exists
        const userSnapshot = await admin.database().ref(`userValues/${userUid}`).once("value");
        if (userSnapshot.exists()) {
            throw new Error("User already exists");
        }

        // Add the user to your system (not Firebase)
        const newUser = await this._userCatalog.addUser(accountType, name, password);

        if (!(newUser instanceof User)) {
            throw new Error("addUser did not return a User instance");
        }

        // Add user details to Firebase Realtime Database
        await admin.database().ref(`userValues/${userUid}`).set({
            accountType: newUser.getType(),
            name: newUser.getName(),
            owedBalance: 0,
            // Add other necessary details
        });

        return newUser;
    }

    static requestQuotationProposal(lengthCm, widthCm, heightCm, weightKg, source, destination){
        let src = this.parseAddress(source);
        let dst = this.parseAddress(destination);
        let size = this.createSize(lengthCm, widthCm, heightCm);
        let weight = this.createWeight(weightKg);
        let pkg = this.createPackage(size, weight);
        return this.createQuotation(src, dst, pkg);
    }

    static requestDelivery(customerID, quotationID){
        return this.createOrder(customerID, quotationID)
    }

    static makePayment(orderID, paymentName, billingAddress){
        let billingAddr = this.parseAddress(billingAddress);
        let order = this._orderCatalog.getOrder(orderID);
        let customerID = order.getCustomerID();
        let quotationID = order.getQuotationID();
        let quotation = this._quotationCatalog.getQuotation(quotationID);
        let payment = fetchCustomerPayment(customerID, paymentName);
        let transaction = createTransaction(customerID, quotationID);
        transaction.setPayment(payment);
        transaction.setBillingAddress(billingAddr);
        let total = quotation.getTotal();
        transaction.makePayment(total); // maybe return something
    }

    static trackOrder(orderID){
        let order = this._orderCatalog.getOrder(orderID);
        return order.getStatus();
    }

    static requestSupport(userID, orderID, issue){
        let user = this._userCatalog.getUser(userID);
        let support = createSupport(userID, orderID, issue);
        let order = this._orderCatalog.getOrder(orderID);
        if (order.getCustomerID() !== userID && order.getCarrierID() !== userID){
            throw new Error("User not allowed to request support for this order.");
        }
        return this.createUserSupportView(user, support);
    }

    static reviewService(comment, rating){
        return this.createReview(comment, rating);
    }

}

module.exports = SkipTheCourrier;