// 100 5
// Input
// weight distance
// PKG1 50 30 OFR001
// PKG2 75 125 OFFR0008
// PKG3 175 100 OFFR003
// PKG4 110 60 OFFR002
// PKG5 155 95 NA
// 2 70 200

// output - only time estimation
// PKG1 0  3.98 ------ v4
// PKG2 0  1.78  
// PKG3 0  1.42  
// PKG4 105 0.85 
// PKG5 0  4.19   -------4  v1-v3

// Algorithm

// find groups
// calculate time 
// remove first two items
// do comparison - 2 times - lowest -  add 

// 1   
// 175
// 100/70 = 1.42 ------v1

// 2  
// 155
// 95/70 = 1.35  ------v3

// twice previous time  3.56,  2.84 and choose lowest
// 1.35 + 2.84 = 4.19

// 3 
// 110 75
// 125 /70 = 1.78   ----v2
// 60/70 = .85   -----v2

// 4 
// 50  
// 30/70 = .42   ----------v4

// twice previous time  3.56,  2.84 + 2 *1.35 = 2.84 + 2.7 = 5.54 and choose lowest
// 3.56 + .42 = 3.98

// Implementation
export class TimeComponent {
    maxElement;
    maxElementsArr = [];

    sortArray(numArray) {
        numArray.sort( (a, b) => {
            return a.weight - b.weight;
        });
        return numArray;
    }

    intersectionOfElements(arr1, arr2) {
        let difference = arr1.filter(a => !arr2.some(b => a.weight === b.weight));
        return difference;
    }


    findElementsUnderLimit(arr) {
        let maxElem = [];

        let sum = 0;

        let finalArr = []


        for (let index = 0; index < arr.length; index++) {

            let uniqueElem = this.intersectionOfElements(arr, this.maxElementsArr);

            if (uniqueElem.length) {

                this.maxElement = uniqueElem.reduce((max, obj) => (max.weight > obj.weight) ? max : obj)
             


                sum = sum + this.maxElement.weight;
                if ((sum < 200)) {
                    this.maxElementsArr.push(this.maxElement);
                    maxElem.push(this.maxElement);
                }
            }

        }
        finalArr.push(maxElem);
        return finalArr;

    }

    userExists(username, arr) {

        if (arr) {


            return arr.some( (el)=> {
                return el.maxTime === username;
            });
        }
    }

    calculateTime(elem) {
        elem[0].forEach((item) => {
            item.time = (Math.round((item.distance / 70) * 100) / 100).toFixed(2);
            item.doubleTime = item.time * 2;

        }
        )
    }

    updateMaxTime(elem) {
        elem[0].forEach((item) => {
            item.maxTime = Math.max(...elem[0].map(o => o.time));
        }
        )
    }

    descendingSort(arr) {
        let reverserArray = arr.sort().reverse();


        return reverserArray;
    }

    compareTimings(t1, t2) {
        return Math.min(t1, t2)
    }

    	
  traverseDelivery(array, vehicleCount, final) {	
    let output = [];	
    let minTime = Infinity;	
    let obj = this;	
    let totalCount = final.length;	
    let count = 0;	
    function removeItems() {	
      let itemIndex;	
      let tempMin = Infinity;	
      for (let index = 0; index < vehicleCount; index++) {	
        for (let j = 0; j < array.length; j++) {	
          if (obj.userExists(array[index], final[j])) {	
  
            itemIndex = j;	
            output.push(final[itemIndex]);	
            if (tempMin > final[itemIndex][0].maxTime) {	
              tempMin = final[itemIndex][0].maxTime;	
            }	
            final.splice(itemIndex, 1);	
            break;	
          }	
        }	
      }	

      if (count) {	
        console.log(output, '154');    	
      }	
      count++;	
    //   if (totalCount - vehicleCount >= final.length) {	
    //     // 4 - 2 > 4 false	
    //     // 4 - 2 > 3 false	
    //     // 4 - 2 >= 2 true	
    //     // 4 - 1 >= 1 true	
    //     console.log(2 * minTime, 'newtime');	
    //   }	
    //   if (final.length > 0) {	
    //     removeItems();	
    //   }  	
    }	
    removeItems();	
}	



}


let obj = new TimeComponent();
// TODO - read input from file
let arr = [{ weight: 50, distance: 30 }, { weight: 75, distance: 125 }, { weight: 175, distance: 100 },
{ weight: 110, distance: 60 }, { weight: 155, distance: 95 }];

// on the basis of weight
let sortedArr = obj.sortArray(arr);
let vehicleAvailable = 2;
let maxTimeEachArr = [];
let final = [];
let itemIndex;
let removedItems = [];


for (let index = 0; index < sortedArr.length - 1; index++) {
    // get all groups
    let elem = obj.findElementsUnderLimit(sortedArr);
    // update time in array
    obj.calculateTime(elem);
    // twice the time to get vehicle estimate
    obj.updateMaxTime(elem);

    maxTimeEachArr.push(elem[0][0].maxTime)
    // all items with their all details
    final.push(elem[0])
}


let reverseArr = obj.descendingSort(maxTimeEachArr);

obj.traverseDelivery(reverseArr, vehicleAvailable, final);
// for (let index = 0; index < vehicleAvailable; index++) {
//     for (let j = 0; j < reverseArr.length; j++) {
//         if (obj.userExists(reverseArr[index], final[j])) {
//             itemIndex = j;
//         }
//     }
//     removedItems.push(final[itemIndex])
//     final.splice(itemIndex, 1);
// }




