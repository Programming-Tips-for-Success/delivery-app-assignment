
export class AppComponent {

    baseCost = 100;
    constructor() {
    }

    returnPrice(weight, distance) {
        let eligibleDiscount;
        if (distance >= 50 && distance <= 150 && weight >= 100 && weight <= 250) {
            eligibleDiscount = 7; // 2
        } else if (distance >= 50 && distance <= 250 && weight >= 10 && weight <= 150) {
            eligibleDiscount = 5; // 3
        } else if (distance <= 200 && weight >= 70 && weight <= 200) {
            eligibleDiscount = 10;  // 1
        } else {
            eligibleDiscount = 0;
        }
        return eligibleDiscount;
    }

    returnCost(baseCost, weight, distance) {
        const totalCost = baseCost + (weight * 10) + (distance * 5)
        return totalCost;
    }

    finalCost(discountPercent, totalCost) {
        const discount = (discountPercent / 100) * totalCost
        const cost = totalCost - discount;
        return {cost, discount};
    }

    finalDiscountedCost(weight, distance, baseCost, packageName) {
        const checkAvailability = this.returnPrice(weight, distance);
        const costWithOutDiscount = this.returnCost(baseCost, weight, distance);
        const {cost: finalDiscountedCost,  discount} = this.finalCost(checkAvailability, costWithOutDiscount);
        console.log(finalDiscountedCost, packageName, discount)
    }

}

// weight distance
// PKG1 5 5 OFR001
// PKG2 15 5 OFR002
// PKG3 10 100 OFR003
let obj = new AppComponent();
obj.finalDiscountedCost(5, 5, 100, "PKG1");