"use strict";
exports.__esModule = true;
var TimeEstimate_1 = require("./TimeEstimate");
var callTimeEstimateMethod = new TimeEstimate_1.TimeEstimate();
var packagesDetail = [{ weight: 50, distance: 30, packageName: 'PKG1' },
    { weight: 75, distance: 125, packageName: 'PKG2' }, { weight: 175, distance: 100, packageName: 'PKG3' },
    { weight: 110, distance: 60, packageName: 'PKG4' }, { weight: 155, distance: 95, packageName: 'PKG5' }];
var updatedPackagesDetails = callTimeEstimateMethod.getUpdatedDetails(packagesDetail);
console.log(updatedPackagesDetails);
