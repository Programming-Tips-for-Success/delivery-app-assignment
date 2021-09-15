"use strict";
exports.__esModule = true;
exports.CostEstimate = void 0;
var CostEstimate = /** @class */ (function () {
    function CostEstimate() {
        this.baseCost = 100;
    }
    CostEstimate.prototype.getEligibleDiscount = function (pkg_weight_in_kg, distance_in_km) {
        if (distance_in_km >= 50 && distance_in_km <= 150 && pkg_weight_in_kg >= 100 && pkg_weight_in_kg <= 250) {
            return 7;
        }
        if (distance_in_km >= 50 && distance_in_km <= 250 && pkg_weight_in_kg >= 10 && pkg_weight_in_kg <= 150) {
            return 5;
        }
        if (distance_in_km <= 200 && pkg_weight_in_kg >= 70 && pkg_weight_in_kg <= 200) {
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
        var eligibleDiscountPercent = this.getEligibleDiscount(weight, distance);
        var costWithOutDiscount = this.getCost(baseCost, weight, distance);
        var _a = this.finalCost(eligibleDiscountPercent, costWithOutDiscount), finalDiscountedCost = _a.cost, discount = _a.discount;
        return { finalDiscountedCost: finalDiscountedCost, discount: discount, packageName: packageName };
    };
    return CostEstimate;
}());
exports.CostEstimate = CostEstimate;
