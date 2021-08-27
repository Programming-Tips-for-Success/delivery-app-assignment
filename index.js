"use strict";
exports.__esModule = true;
exports.AppComponent = void 0;
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.baseCost = 100;
    }
    AppComponent.prototype.returnPrice = function (weight, distance) {
        var eligibleDiscount;
        if (distance >= 50 && distance <= 150 && weight >= 100 && weight <= 250) {
            eligibleDiscount = 7; // 2
        }
        else if (distance >= 50 && distance <= 250 && weight >= 10 && weight <= 150) {
            eligibleDiscount = 5; // 3
        }
        else if (distance <= 200 && weight >= 70 && weight <= 200) {
            eligibleDiscount = 10; // 1
        }
        else {
            eligibleDiscount = 0;
        }
        return eligibleDiscount;
    };
    AppComponent.prototype.returnCost = function (baseCost, weight, distance) {
        var totalCost = baseCost + (weight * 10) + (distance * 5);
        return totalCost;
    };
    AppComponent.prototype.finalCost = function (discountPercent, totalCost) {
        var discount = (discountPercent / 100) * totalCost;
        var cost = totalCost - discount;
        return { cost: cost, discount: discount };
    };
    AppComponent.prototype.finalDiscountedCost = function (weight, distance, baseCost, packageName) {
        var checkAvailability = this.returnPrice(weight, distance);
        var costWithOutDiscount = this.returnCost(baseCost, weight, distance);
        var _a = this.finalCost(checkAvailability, costWithOutDiscount), finalDiscountedCost = _a.cost, discount = _a.discount;
        console.log(finalDiscountedCost, packageName, discount);
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// weight distance
// PKG1 5 5 OFR001
// PKG2 15 5 OFR002
// PKG3 10 100 OFR003
var obj = new AppComponent();
obj.finalDiscountedCost(5, 5, 100, "PKG1");
