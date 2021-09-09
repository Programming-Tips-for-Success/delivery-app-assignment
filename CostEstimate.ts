
export class CostEstimate {

    baseCost = 100;
    constructor() {
    }

    getEligibleDiscount(weight: number, distance: number) {

        if (distance >= 50 && distance <= 150 && weight >= 100 && weight <= 250) {
            return   7;
        } 
        if (distance >= 50 && distance <= 250 && weight >= 10 && weight <= 150) {
            return  5;
        } 
         if (distance <= 200 && weight >= 70 && weight <= 200) {
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
        const checkAvailability = this.getEligibleDiscount(weight, distance);
        const costWithOutDiscount = this.getCost(baseCost, weight, distance);
        const {cost: finalDiscountedCost,  discount} = this.finalCost(checkAvailability, costWithOutDiscount);
        console.log(finalDiscountedCost, packageName, discount);
    }

}

// weight distance
// PKG1 5 5 OFR001
// PKG2 15 5 OFR002
// PKG3 10 100 OFR003
let obj = new CostEstimate();
obj.finalDiscountedCost(5, 5, 100, "PKG1");