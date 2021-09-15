import { TimeEstimate } from './TimeEstimate';

let callTimeEstimateMethod = new TimeEstimate();

let packagesDetail = [{ weight: 50, distance: 30, packageName: 'PKG1' }, 
{ weight: 75, distance: 125,  packageName:'PKG2'  }, { weight: 175, distance: 100, packageName:'PKG3'  },
{ weight: 110, distance: 60, packageName:'PKG4'  }, { weight: 155, distance: 95, packageName:'PKG5'  }];

let updatedPackagesDetails = callTimeEstimateMethod.getUpdatedDetails(packagesDetail);




