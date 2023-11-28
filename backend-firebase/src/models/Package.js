const Size = require('../models/Size');
const Weight = require('../models/Weight');


class Package{
    constructor(id, size, weight){
        this._id = id;
        this._size = size;
        this._weight = weight;
    }
    getID(){
        return this.id;
    }
    getSize(){
        return this._size;
    }
    getWeight(){
        return this._weight;
    }
    setSize(size){
        this._size = size;
    }
    setWeight(weight){
        this._weight = weight;
    }

    serialize() {
        return JSON.stringify({
            id: this._id,
            size: this._size.serialize(),
            weight: this._weight.serialize(),
        })
    }

    static deserialize(jsonString){
        const data = JSON.parse(jsonString);
        const size = Size.deserialize(data.size);
        const weight = Weight.deserialize(data.weight);
        const pkg = new Package(data.id, size, weight);

        return pkg;
    }
}

module.exports = Package;