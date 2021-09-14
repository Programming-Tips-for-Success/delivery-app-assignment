

describe("CostEstimate", function() {
    let DeliveryCost = require('./CostEstimate.js');
    let CostEstimate;

  
    beforeEach(function() {
      CostEstimate =  new DeliveryCost.CostEstimate();

    });
  
    it("should calculate cost when weight is 5 and distance is 5", function() {
     const deliveryPackageDetails = CostEstimate.finalDiscountedCost(5, 5, 100, "PKG1");
      expect(deliveryPackageDetails.finalDiscountedCost).toEqual(175);
      expect(deliveryPackageDetails.discount).toEqual(0);
      expect(deliveryPackageDetails.packageName).toEqual('PKG1');

    });

    
    it("should calculate cost when weight is 15 and distance is 5", function() {
      const deliveryPackageDetails = CostEstimate.finalDiscountedCost(15, 5, 100, "PKG2");
       expect(deliveryPackageDetails.finalDiscountedCost).toEqual(275);
       expect(deliveryPackageDetails.discount).toEqual(0);
       expect(deliveryPackageDetails.packageName).toEqual('PKG2');
 
     });

     it("should calculate cost when weight is 10 and distance is 100", function() {
      const deliveryPackageDetails = CostEstimate.finalDiscountedCost(10, 100, 100, "PKG3");
       expect(deliveryPackageDetails.finalDiscountedCost).toEqual(665);
       expect(deliveryPackageDetails.discount).toEqual(35);
       expect(deliveryPackageDetails.packageName).toEqual('PKG3');
 
     });
  
  });
  