const Package = require('../models/Package');

class PackageCatalog {
    static _instance;
    static _packageCount;

    static getInstance() {
        if (!PackageCatalog._instance) {
            PackageCatalog._instance = new PackageCatalog();
        }
        return PackageCatalog._instance;
    }

    constructor() {
        if (PackageCatalog._instance) {
            throw new Error("Singleton class, use getInstance method.");
        }
        this._packages = new Map();
        this._packageCount = 0;
    }

    addPackage(size, weight) {
        let newPackageID = this._packageCount++;
        let pkg = new Package(newPackageID, size, weight);
        this._packages.set(newPackageID, pkg);
        return pkg;
    }

    getPackage(packageID) {
        if (!this._packages.get(packageID)) {
            throw new Error("Invalid Package! Package not Found.");
        }
        return this._packages.get(packageID);
    }

    removePackage(packageID) {
        if (!this._packages.get(packageID)) {
            throw new Error("Invalid Package! Package not Found.");
        }
        let pkg = this._packages.get(packageID);
        this._packages.delete(packageID);
        return pkg;
    }

    serialize() {
        const serializedPackages = Array.from(this._packages.values(), pkg => pkg.serialize());
        return JSON.stringify({
            packageCount: this._packageCount,
            packages: serializedPackages,
        });
    }

    deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const deserializedPackages = data.packages.map(packageData => Package.deserialize(packageData));

        this._packages = new Map(deserializedPackages.map(pkg => [pkg.getID(), pkg]));
        this._packageCount = data.packageCount;
    }
}

module.exports = PackageCatalog;
