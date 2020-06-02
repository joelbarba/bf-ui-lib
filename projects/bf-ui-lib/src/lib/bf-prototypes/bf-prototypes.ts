import BfArray from './array.prototypes';
import BfObject from './object.prototype';
import BfNumber from './number.prototype';
import BfString from './string.prototype';
import BfDate from './date.prototype';
import { dCopy } from './deep-copy';
import { isEqual } from './deep-equal';


const BfPrototypes = {
  run: (list?: Array<string>) => {
    // console.log('Extending bf-ui-lib prototypes');

    // Extend Array prototype
    for (const proFnName in BfArray) {
      if (BfArray.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Array')) {
        // console.log(`Extending Array prototype with --> .${proFnName}()`);
        Array.prototype[proFnName] = BfArray[proFnName];
      }
    }

    // Extend Object prototype
    for (const proFnName in BfObject) {
      if (BfObject.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Object')) {
        // console.log(`Extending Object prototype with --> .${proFnName}()`);
        Object.defineProperty(Object.prototype, proFnName, {
          value: BfObject[proFnName],
          enumerable: false
        });
      }
    }

    // Extend Number prototype
    for (const proFnName in BfNumber) {
      if (BfNumber.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Number')) {
        // console.log(`Extending Number prototype with --> .${proFnName}()`);
        Number.prototype[proFnName] = BfNumber[proFnName];
      }
    }

    // Extend String prototype
    for (const proFnName in BfString) {
      if (BfString.hasOwnProperty(proFnName) && isFnInList(proFnName, 'String')) {
        // console.log(`Extending String prototype with --> .${proFnName}()`);
        String.prototype[proFnName] = BfString[proFnName];
      }
    }

    // Extend Date prototype
    for (const proFnName in BfDate) {
      if (BfDate.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Date')) {
        // console.log(`Extending Date prototype with --> .${proFnName}()`);
        Date.prototype[proFnName] = BfDate[proFnName];
      }
    }


    // Check if the prototype function name is in the list for the variable type
    function isFnInList(proFnName: string, varType: string) {
      return !list || !!list.filter(e => {
        const key = e.split('.');
        return (key.length >= 1 && key[0] === varType && key[1] === proFnName);
      }).length;
    }
  }
};
export { BfPrototypes, BfArray, BfObject, BfNumber, BfString, BfDate, dCopy, isEqual };
