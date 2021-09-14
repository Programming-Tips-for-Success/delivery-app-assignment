"use strict";
exports.__esModule = true;
exports.CostEstimate = void 0;
var CostEstimate = /** @class */ (function () {
    function CostEstimate() {
        this.baseCost = 100;
    }
    CostEstimate.prototype.getEligibleDiscount = function (weight, distance) {
        if (distance >= 50 && distance <= 150 && weight >= 100 && weight <= 250) {
            return 7;
        }
        if (distance >= 50 && distance <= 250 && weight >= 10 && weight <= 150) {
            return 5;
        }
        if (distance <= 200 && weight >= 70 && weight <= 200) {
            return 10;
        }
        return 0;
    };
    CostEstimate.prototype.getCost = function (baseCost, weight, distance) {
        var totalCost = baseCost + (weight * 10) + (distance * 5);
        return totalCost;
    };
    CostEstimate.prototype.finalCost = function (discountPercent, totalCost) {
        var discount = (discountPercent / 100) * totalCost;
        var cost = totalCost - discount;
        return { cost: cost, discount: discount };
    };
    CostEstimate.prototype.finalDiscountedCost = function (weight, distance, baseCost, packageName) {
        var checkAvailability = this.getEligibleDiscount(weight, distance);
        var costWithOutDiscount = this.getCost(baseCost, weight, distance);
        var _a = this.finalCost(checkAvailability, costWithOutDiscount), finalDiscountedCost = _a.cost, discount = _a.discount;
        return { finalDiscountedCost: finalDiscountedCost, discount: discount, packageName: packageName };
    };
    return CostEstimate;
}());
exports.CostEstimate = CostEstimate;
