

describe("TimeEstimate", function() {
    let DeliveryCost = require('./TimeEstimate.js');
    let CostEstimate;

  
    beforeEach(function() {
      CostEstimate =  new DeliveryCost.TimeEstimate();

    });
  
    it("should calculate estimated Time to deliver packages", function() {
      let packagesDetail = [{ weight: 50, distance: 30, packageName: 'PKG1' }, 
      { weight: 75, distance: 125,  packageName:'PKG2'  }, { weight: 175, distance: 100, packageName:'PKG3'  },
      { weight: 110, distance: 60, packageName:'PKG4'  }, { weight: 155, distance: 95, packageName:'PKG5'  }];
     const deliveryPackageDetails = CostEstimate.getUpdatedDetails(packagesDetail);
     console.log(deliveryPackageDetails);

      expect(deliveryPackageDetails[0][0].packageName).toEqual('PKG4');
      expect(deliveryPackageDetails[0][0].time).toEqual('0.86');

      expect(deliveryPackageDetails[0][1].packageName).toEqual('PKG2');
      expect(deliveryPackageDetails[0][1].time).toEqual('1.79');

      expect(deliveryPackageDetails[1][0].packageName).toEqual('PKG3');
      expect(deliveryPackageDetails[1][0].time).toEqual('1.43');

      expect(deliveryPackageDetails[2][0].packageName).toEqual('PKG5');
      expect(deliveryPackageDetails[2][0].time).toEqual(4.22);

      expect(deliveryPackageDetails[3][0].packageName).toEqual('PKG1');
      expect(deliveryPackageDetails[3][0].time).toEqual(4.01);

    });

    

  
  });
  