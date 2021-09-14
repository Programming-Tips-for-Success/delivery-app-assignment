import { TimeEstimate } from './TimeEstimate';

let callTimeEstimateMethod = new TimeEstimate();

let packagesDetail = [{ weight: 50, distance: 30 }, { weight: 75, distance: 125 }, { weight: 175, distance: 100 },
{ weight: 110, distance: 60 }, { weight: 155, distance: 95 }];

callTimeEstimateMethod.getUpdatedPackagesDetails(packagesDetail);
