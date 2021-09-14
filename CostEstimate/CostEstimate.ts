
export class CostEstimate {

    baseCost = 100;
 

    getEligibleDiscount(pkg_weight_in_kg: number, distance_in_km: number) {

        if (distance_in_km >= 50 && distance_in_km <= 150 && pkg_weight_in_kg >= 100 && pkg_weight_in_kg <= 250) {
            return   7;
        } 
        if (distance_in_km >= 50 && distance_in_km <= 250 && pkg_weight_in_kg >= 10 && pkg_weight_in_kg <= 150) {
            return  5;
        } 
         if (distance_in_km <= 200 && pkg_weight_in_kg >= 70 && pkg_weight_in_kg <= 200) {
            return   10; 
        } 
        return 0;
    }

    getCost(baseCost: number, weight: number, distance: number) {
        const totalCost = baseCost + (weight * 10) + (distance * 5)
        return totalCost;
    }

    finalCost(discountPercent: number, totalCost: number) {
        const discount = (discountPercent / 100) * totalCost;
        const cost = totalCost - discount;
        return {cost, discount};
    }

    finalDiscountedCost(weight: number, distance: number, baseCost: number, packageName: string) {
        const eligibleDiscountPercent = this.getEligibleDiscount(weight, distance);
        const costWithOutDiscount = this.getCost(baseCost, weight, distance);
        const {cost: finalDiscountedCost,  discount} = this.finalCost(eligibleDiscountPercent, costWithOutDiscount);
        return {finalDiscountedCost, discount, packageName};
    }

}



