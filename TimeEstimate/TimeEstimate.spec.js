

describe("TimeEstimate", function() {
    let DeliveryCost = require('./TimeEstimate.js');
    let CostEstimate;

  
    beforeEach(function() {
      CostEstimate =  new DeliveryCost.TimeEstimate();

    });
  
    it("should calculate cost when weight is 5 and distance is 5", function() {
        let packagesDetail = [{ weight: 50, distance: 30 }, { weight: 75, distance: 125 }, { weight: 175, distance: 100 },
            { weight: 110, distance: 60 }, { weight: 155, distance: 95 }];
     const deliveryPackageDetails = CostEstimate.getUpdatedPackagesDetails(packagesDetail);
    //   expect(deliveryPackageDetails.finalDiscountedCost).toEqual(175);
    //   expect(deliveryPackageDetails.discount).toEqual(0);
    //   expect(deliveryPackageDetails.packageName).toEqual('PKG1');

    });

    

  
  });
  