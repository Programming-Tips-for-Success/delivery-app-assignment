"use strict";
exports.__esModule = true;
exports.TimeEstimate = void 0;
var CostEstimate_1 = require("../CostEstimate/CostEstimate");
var TimeEstimate = /** @class */ (function () {
    function TimeEstimate() {
        this.packagesDetails = [];
        this.vehiclesTime = {};
        this.updatedPackagesDetailsWithTime = [];
        this.costEstimate = new CostEstimate_1.CostEstimate();
    }
    TimeEstimate.prototype.sortPackages = function (packagesInfo) {
        packagesInfo.sort(function (a, b) {
            return a.weight - b.weight;
        });
        return packagesInfo;
    };
    TimeEstimate.prototype.intersectionOfElements = function (allPackages, packageDetail) {
        var difference = allPackages.filter(function (a) { return !packageDetail.some(function (b) { return a.weight === b.weight; }); });
        return difference;
    };
    // get all groups
    TimeEstimate.prototype.findElementsUnderLimit = function (packagesGroup) {
        var selectedPackagesItems = [];
        var sum = 0;
        var selectedPackages = [];
        for (var index = 0; index < packagesGroup.length - 1; index++) {
            var uniqueElem = this.intersectionOfElements(packagesGroup, this.packagesDetails);
            if (uniqueElem.length) {
                this.maxElement = this.getMaxElement(uniqueElem);
                sum = sum + this.maxElement.weight;
                if ((sum < 200)) {
                    this.packagesDetails.push(this.maxElement);
                    selectedPackagesItems.push(this.maxElement);
                }
            }
        }
        selectedPackages.push(selectedPackagesItems);
        return selectedPackages;
    };
    TimeEstimate.prototype.getMaxElement = function (uniqueElem) {
        return uniqueElem.reduce(function (max, packageDetail) { return (max.weight > packageDetail.weight) ? max : packageDetail; });
    };
    TimeEstimate.prototype.packageExists = function (maxTime, allPackages) {
        if (allPackages) {
            return allPackages.some(function (el) {
                return el.maxTime === maxTime;
            });
        }
    };
    // update time in array
    TimeEstimate.prototype.calculateTime = function (selectedPackage) {
        selectedPackage[0].forEach(function (item) {
            item.time = (Math.round((item.distance / 70) * 100) / 100).toFixed(2);
            item.doubleTime = item.time * 2;
        });
    };
    // twice the time to get vehicle estimate
    TimeEstimate.prototype.updateMaxTime = function (selectedPackage) {
        selectedPackage[0].forEach(function (item) {
            item.maxTime = Math.max.apply(Math, selectedPackage[0].map(function (o) { return o.time; }));
        });
    };
    TimeEstimate.prototype.descendingSort = function (packagesDetail) {
        var reverserPackages = packagesDetail.sort().reverse();
        return reverserPackages;
    };
    TimeEstimate.prototype.traverseDelivery = function (packagesMaximumTime, updatesVehiclesDetail) {
        var vehicleAvailable = 2;
        var count = 0;
        this.removeItems(vehicleAvailable, packagesMaximumTime, count, updatesVehiclesDetail);
    };
    TimeEstimate.prototype.removeItems = function (vehicleCount, packagesMaximumTime, count, updatesVehiclesDetail) {
        var itemIndex;
        for (var index = 0; index < vehicleCount; index++) {
            for (var j = 0; j < packagesMaximumTime.length; j++) {
                if (this.packageExists(packagesMaximumTime[index], updatesVehiclesDetail[j])) {
                    itemIndex = j;
                    if (this.minimumTime) {
                        var vehicleTime = 0;
                        vehicleTime = this.minimumTime + (parseFloat(updatesVehiclesDetail[j][0].maxTime));
                        this.vehiclesTime[index + 1] = vehicleTime;
                        this.findMinimumTime();
                        updatesVehiclesDetail[j][itemIndex]['time'] = vehicleTime;
                        this.updatedPackagesDetailsWithTime.push(updatesVehiclesDetail[j]);
                    }
                    else {
                        this.vehiclesTime[index] = 2 * (updatesVehiclesDetail[j][0].maxTime);
                        this.updatedPackagesDetailsWithTime.push(updatesVehiclesDetail[j]);
                    }
                    updatesVehiclesDetail.splice(itemIndex, 1);
                    break;
                }
            }
        }
        packagesMaximumTime.splice(0, 2);
        this.findMinimumTime();
        count++;
        if (packagesMaximumTime.length > 0) {
            this.removeItems(vehicleCount, packagesMaximumTime, count, updatesVehiclesDetail);
        }
    };
    TimeEstimate.prototype.findMinimumTime = function () {
        var _this = this;
        var packagesVehicleTime = Object.keys(this.vehiclesTime).map(function (key) { return _this.vehiclesTime[key]; });
        var minTime = Math.min.apply(Math, packagesVehicleTime);
        this.minimumTime = minTime;
    };
    TimeEstimate.prototype.getUpdatedPackagesDetails = function (packagesDetail) {
        // on the basis of weight
        var sortPackages = this.sortPackages(packagesDetail);
        var maximumTimeVehicleTakes = [];
        var updatesVehiclesDetail = [];
        for (var index = 0; index < sortPackages.length - 1; index++) {
            var elem = this.findElementsUnderLimit(sortPackages);
            this.calculateTime(elem);
            this.updateMaxTime(elem);
            //  all items with their all details
            if (elem[0].length) {
                maximumTimeVehicleTakes.push(elem[0][0].maxTime);
            }
            updatesVehiclesDetail.push(elem[0]);
        }
        var packagesMaximumTime = this.descendingSort(maximumTimeVehicleTakes);
        this.traverseDelivery(packagesMaximumTime, updatesVehiclesDetail);
        return this.updatedPackagesDetailsWithTime;
    };
    TimeEstimate.prototype.getUpdatedDetails = function (packagesDetail) {
        var _this = this;
        var updatedPackagesDetails = this.getUpdatedPackagesDetails(packagesDetail);
        updatedPackagesDetails.forEach(function (packageItem) {
            for (var j = 0; j < packageItem.length; j++) {
                var _a = _this.costEstimate.finalDiscountedCost(+(packageItem[j]['weight']), +(packageItem[j]['distance']), 100, packageItem[j]['packageName']), discount = _a.discount, finalDiscountedCost = _a.finalDiscountedCost;
                packageItem[j]['discount'] = discount;
                packageItem[j]['finalDiscountedCost'] = finalDiscountedCost;
            }
        });
        return updatedPackagesDetails;
    };
    return TimeEstimate;
}());
exports.TimeEstimate = TimeEstimate;
