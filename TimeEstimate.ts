
export class TimeEstimate {
    maxElement;
    maxElementsArray = [];
    sortArray(packagesArray) {
        packagesArray.sort((a, b) => {
            return a.weight - b.weight;
        });
        return packagesArray;
    }
    intersectionOfElements(arr1, arr2) {
        let difference = arr1.filter(a => !arr2.some(b => a.weight === b.weight));
        return difference;
    }
    // get all groups
    findElementsUnderLimit(packagesArray) {
        let maxElem = [];
        let sum = 0;
        let selectedPackages = []
        for (let index = 0; index < packagesArray.length - 1; index++) {
            let uniqueElem = this.intersectionOfElements(packagesArray, this.maxElementsArray);
            if (uniqueElem.length) {
                this.maxElement = this.getMaxElement(uniqueElem);
                sum = sum + this.maxElement.weight;
                if ((sum < 200)) {
                    this.maxElementsArray.push(this.maxElement);
                    maxElem.push(this.maxElement);
                }

            }
        }
        selectedPackages.push(maxElem);
        return selectedPackages;
    }
    getMaxElement(uniqueElem) {
        return uniqueElem.reduce((max, packageDetail) => (max.weight > packageDetail.weight) ? max : packageDetail)
    }

    packageExists(username, packagesArray) {
        if (packagesArray) {
            return packagesArray.some((el) => {
                return el.maxTime === username;
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
    descendingSort(packagesArray) {
        let reverserArray = packagesArray.sort().reverse();
        return reverserArray;
    }

    traverseDelivery(maximumTimeArray, updatesVehiclesDetail) {
        let vehicleAvailable = 2;
        let count = 0;
        for (let index = 0; index < updatesVehiclesDetail.length; index++) {
            this.removeItems(vehicleAvailable, maximumTimeArray, count, updatesVehiclesDetail);
        }

    }
    removeItems(vehicleCount, array, count, updatesVehiclesDetail) {
        let itemIndex;

        for (let index = 0; index < vehicleCount; index++) {
            for (let j = 0; j < array.length; j++) {
                if (this.packageExists(array[index], updatesVehiclesDetail[j])) {
                    itemIndex = j;
                    updatesVehiclesDetail.splice(itemIndex, 1);
                    break;
                }
            }

        }
        count++;

    }
    // all items with their all details
    pushItems(elem) {
        if (elem[0].length) {
            maximumTimeVehicleTakes.push(elem[0][0].maxTime)
        }

        updatesVehiclesDetail.push(elem[0])
    }
}
let callTimeEstimateMethod = new TimeEstimate();
// TODO - read input from file
let packagesDetail = [{ weight: 50, distance: 30 }, { weight: 75, distance: 125 }, { weight: 175, distance: 100 },
{ weight: 110, distance: 60 }, { weight: 155, distance: 95 }];
// on the basis of weight
let sortedArr = callTimeEstimateMethod.sortArray(packagesDetail);

let maximumTimeVehicleTakes = [];
let updatesVehiclesDetail = [];
for (let index = 0; index < sortedArr.length - 1; index++) {
    let elem = callTimeEstimateMethod.findElementsUnderLimit(sortedArr);

    callTimeEstimateMethod.calculateTime(elem);
    callTimeEstimateMethod.updateMaxTime(elem);
    callTimeEstimateMethod.pushItems(elem);
}
let reverseArr = callTimeEstimateMethod.descendingSort(maximumTimeVehicleTakes);
callTimeEstimateMethod.traverseDelivery(reverseArr, updatesVehiclesDetail);