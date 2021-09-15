import { CostEstimate } from '../CostEstimate/CostEstimate';

export class TimeEstimate {
    maxElement;
    packagesDetails = [];
    minimumTime;
    vehiclesTime = {};
    updatedPackagesDetailsWithTime = [];
    costEstimate;
    constructor() {
        this.costEstimate = new CostEstimate();
    }

    sortPackages(packagesInfo) {
        packagesInfo.sort((a, b) => {
            return a.weight - b.weight;
        });
        return packagesInfo;
    }

    intersectionOfElements(allPackages, packageDetail) {
        let difference = allPackages.filter(a => !packageDetail.some(b => a.weight === b.weight));
        return difference;
    }

    // get all groups
    findElementsUnderLimit(packagesGroup) {
        let selectedPackagesItems = [];
        let sum = 0;
        let selectedPackages = []
        for (let index = 0; index < packagesGroup.length - 1; index++) {
            let uniqueElem = this.intersectionOfElements(packagesGroup, this.packagesDetails);
            if (uniqueElem.length) {
                this.maxElement = this.getMaxElement(uniqueElem);
                sum = sum + this.maxElement.weight;
                if ((sum < 200)) {
                    this.packagesDetails.push(this.maxElement);
                    selectedPackagesItems.push(this.maxElement);
                }
            }
        }
        selectedPackages.push(selectedPackagesItems);
        return selectedPackages;
    }

    getMaxElement(uniqueElem) {
        return uniqueElem.reduce((max, packageDetail) => (max.weight > packageDetail.weight) ? max : packageDetail)
    }

    packageExists(maxTime, allPackages) {
        if (allPackages) {
            return allPackages.some((el) => {
                return el.maxTime === maxTime;
            });
        }
    }

    // update time in array
    calculateTime(selectedPackage) {
        selectedPackage[0].forEach((item) => {
            item.time = (Math.round((item.distance / 70) * 100) / 100).toFixed(2);
            item.doubleTime = item.time * 2;
        }
        )
    }

    // twice the time to get vehicle estimate
    updateMaxTime(selectedPackage) {
        selectedPackage[0].forEach((item) => {
            item.maxTime = Math.max(...selectedPackage[0].map(o => o.time));
        }
        )
    }

    descendingSort(packagesDetail) {
        let reverserPackages = packagesDetail.sort().reverse();
        return reverserPackages;
    }

    traverseDelivery(packagesMaximumTime, updatesVehiclesDetail) {
        let vehicleAvailable = 2;
        let count = 0;
        this.removeItems(vehicleAvailable, packagesMaximumTime, count, updatesVehiclesDetail);
    }

    removeItems(vehicleCount, packagesMaximumTime, count, updatesVehiclesDetail) {
        let itemIndex;
        for (let index = 0; index < vehicleCount; index++) {
            for (let j = 0; j < packagesMaximumTime.length; j++) {
                if (this.packageExists(packagesMaximumTime[index], updatesVehiclesDetail[j])) {
                    itemIndex = j;
                    if (this.minimumTime) {
                        let vehicleTime = 0;
                        vehicleTime = this.minimumTime + (parseFloat(updatesVehiclesDetail[j][0].maxTime));

                        this.vehiclesTime[index + 1] = vehicleTime;

                        this.findMinimumTime();

                        updatesVehiclesDetail[j][itemIndex]['time'] = vehicleTime;
                        this.updatedPackagesDetailsWithTime.push(updatesVehiclesDetail[j]);

                    } else {
                        this.vehiclesTime[index] = 2 * (updatesVehiclesDetail[j][0].maxTime);
                        this.updatedPackagesDetailsWithTime.push(updatesVehiclesDetail[j]);
                    }


                    updatesVehiclesDetail.splice(itemIndex, 1);
                    break;
                }
            }
        }
        packagesMaximumTime.splice(0, 2);


        this.findMinimumTime();
        count++;
        if (packagesMaximumTime.length > 0) {
            this.removeItems(vehicleCount, packagesMaximumTime, count, updatesVehiclesDetail);
        }
    }

    findMinimumTime() {
        const packagesVehicleTime = Object.keys(this.vehiclesTime).map((key) => { return this.vehiclesTime[key]; });
        let minTime = Math.min(...packagesVehicleTime);
        this.minimumTime = minTime;
    }

    getUpdatedPackagesDetails(packagesDetail) {
        // on the basis of weight
        let sortPackages = this.sortPackages(packagesDetail);

        let maximumTimeVehicleTakes = [];
        let updatesVehiclesDetail = [];
        for (let index = 0; index < sortPackages.length - 1; index++) {
            let elem = this.findElementsUnderLimit(sortPackages);

            this.calculateTime(elem);
            this.updateMaxTime(elem);

            //  all items with their all details
            if (elem[0].length) {
                maximumTimeVehicleTakes.push(elem[0][0].maxTime)
            }

            updatesVehiclesDetail.push(elem[0])
        }


        let packagesMaximumTime = this.descendingSort(maximumTimeVehicleTakes);
        this.traverseDelivery(packagesMaximumTime, updatesVehiclesDetail);
        return this.updatedPackagesDetailsWithTime;
    }

    getUpdatedDetails(packagesDetail) {
        let updatedPackagesDetails = this.getUpdatedPackagesDetails(packagesDetail);

        updatedPackagesDetails.forEach(packageItem => {

            for (let j = 0; j < packageItem.length; j++) {
                let { discount, finalDiscountedCost } = this.costEstimate.finalDiscountedCost(+(packageItem[j]['weight']),
                    +(packageItem[j]['distance']), 100, packageItem[j]['packageName']);
                packageItem[j]['discount'] = discount;
                packageItem[j]['finalDiscountedCost'] = finalDiscountedCost;

            }
        });


        return updatedPackagesDetails;
    }
}