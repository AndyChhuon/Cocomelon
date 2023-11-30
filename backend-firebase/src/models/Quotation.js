const Address = require('../models/Address');
const Package = require('../models/Package');

class Quotation {
    constructor(id, src, dst, pkg) {
        this._id = id;
        this._src = src;
        this._dst = dst;
        this._packages = [];
        this._packages.push(pkg);
    }
    getID() {
        return this._id;
    }
    getSource() {
        return this._src;
    }
    getDestination() {
        return this._dst;
    }
    getPackages() {
        return this._packages;
    }
    addPackage(pkg) {
        this._packages.push(pkg);
    }
    removePackage(packageID) {
        this._packages = this._packages.filter(pkg => pkg.getID() !== packageID);
    }
    getTotal() {
        const baseRatePerKg = 10; // Base rate per kg
        const baseRatePerCm3 = 0.05; // Base rate per cubic centimeter

        let totalWeight = this._packages.reduce((total, pkg) => total + pkg.getWeight().getWeightKg(), 0);
        let totalVolume = this._packages.reduce((total, pkg) => {
            const size = pkg.getSize();
            return total + (size.getLengthCm() * size.getWidthCm() * size.getHeightCm());
        }, 0);

        let price = (totalWeight * baseRatePerKg) + (totalVolume * baseRatePerCm3);
        if (this._dst.getCountry().toLowerCase() !== 'canada') {
            price *= 2;
        }

        return price;
    }

    serialize() {
        const serializedPackages = this._packages.map(pkg => pkg.serialize());
        return JSON.stringify({
            id: this._id,
            src: this._src.serialize(),
            dst: this._dst.serialize(),
            packages: serializedPackages
        });
    }

    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const src = Address.deserialize(data.src);
        const dst = Address.deserialize(data.dst);
        const quotation = new Quotation(data.id, src, dst);

        data.packages.forEach(pkgData => {
            const pkg = Package.deserialize(pkgData);
            quotation.addPackage(pkg);
        });

        return quotation;
    }
}

module.exports = Quotation;
