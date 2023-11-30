class Address{
    constructor(civicNumber, streetName, postalCode, province, country){
        this._civicNumer = civicNumber;
        this._streetName = streetName;
        this._postalCode = postalCode;
        this._province = province;
        this._country = country;
    }
    getCivicNumber(){
        return this._civicNumer;
    }
    getStreetName(){
        return this._streetName;
    }
    getPostalCode(){
        return this._postalCode;
    }
    getProvince(){
        return this._province;
    }
    getCountry(){
        return this._country
    }
}

module.exports = Address;