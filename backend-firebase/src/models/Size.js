class Size{
    constructor(lengthCm, widthCm, heightCm){
        this._length = lengthCm;
        this._width = widthCm;
        this.height = heightCm;
    }
    getLengthCm(){
        return this._length;
    }
    getWidthCm(){
        return this._width;
    }
    getHeightCm(){
        return this._height;
    }
    getLengthInch(){
        return (this._length * 0.393701);
    }
    getWidthInch(){
        return (this._width * 0.393701);
    }
    getHeightInch(){
        return (this._height * 0.393701);
    }
}

module.exports = Size;