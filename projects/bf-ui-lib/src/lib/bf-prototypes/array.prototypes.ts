// Export functions to extend the Array prototype
import { arrayDeepCopy } from './deep-copy';
import { isEqualTo } from './deep-equal';

declare global {
  interface Array<T> {
    getById(id: any): T | undefined;
    getByProp(property: string, value: any): T | undefined;
    getIndexById(id: any): number;
    removeById(id: any): T | undefined;
    removeByProp(property: string, value: any): T | undefined;
    getKeyById(keyName: string, id: any): any;
    getKeyByProp(keyName: string, property: string, value: any): any;
    getLast(): T | undefined;
    toObject(): Object;
    removeDuplicates(compareFn?: (itemA: any, itemB: any) => boolean): Array<T>;
    isEqualTo(arr2: Array<any>): boolean;
    dCopy(): Array<T>;
    // TODO:
    // To use await in a forEach --> https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
    // asyncForEach(callback: Function): Array<T>;
  }
}


const BfArray: any = {}; // Wrap all functions here

/**
 * @memberOf Array
 * @param id - Value of the ID property of the object to match
 * @description Returns the first object (if any) in the array that matches by .id. Undefined if not found.
 */
BfArray.getById = function(id: any) {
  return this.find(item => !!item && item['id'] === id);
};

/**
 * @memberOf BfArray
 * @param property - the name of the objects property
 * @param value - Value of the property of the object to match
 * @description Returns the first object (if any) in the array that matches the given property / value.
 *              Undefined if not found.
 */
BfArray.getByProp = function(property: string, value: any) {
  return this.find(item => !!item && item[property] === value);
};

/**
 * @memberOf BfArray
 * @param id - Value of the ID property of the object to match
 * @description returns the index of the first object (if any) in the array that matches by .id. If not -1
 */
BfArray.getIndexById = function(id: any): number {
  return this.findIndex(item => !!item && item['id'] === id);
};

/**
 * @memberOf BfArray
 * @description Returns the last element of the array, or undefined if it's empty
 */
BfArray.getLast = function() {
  if (!!this && !!this.length) {
    return this[this.length - 1];
  } else {
    return undefined;
  }
};

/**
 * @memberOf Array
 * @param keyName - name of the property of the object to return
 * @param id - the value of the ID of the object we want to match
 * @description Gets an object by its ID and returns a selected property of it (if present).
 */
BfArray.getKeyById = function(keyName: string, id: any) {
  const obj = this.find(item => !!item && item['id'] === id);
  if (!keyName) { return obj; }
  if (!!obj && obj.hasOwnProperty(keyName)) {
    return obj[keyName];
  } else {
    return undefined;
  }
};

/**
 * @memberOf Array
 * @param keyName - name of the property of the object to return
 * @param property - name of the property to match by
 * @param value - the value we want it to equal
 * @description Gets an object by matching by "property" and returns its selected property (keyName).
 */
BfArray.getKeyByProp = function(keyName: string, property: string, value: any) {
  const obj = this.find(item => !!item && item[property] === value);
  if (!keyName) { return obj; }
  if (!!obj && obj.hasOwnProperty(keyName)) {
    return obj[keyName];
  } else {
    return undefined;
  }
};

/**
 * @memberOf BfArray
 * @param id - Value of the ID property of the object to match
 * @description removes the first object (if any) in the array that matches by .id
 */
BfArray.removeById = function(id: any) {
  const index = this.findIndex(item => !!item && item['id'] === id);
  if (index >= 0) {
    return this.splice(index, 1);
  } else {
    return undefined;
  }
};

/**
 * @memberOf BfArray
 * @param property - the name of the objects property
 * @param value - Value of the property of the object to match
 * @description removes the first object (if any) in the array that matches by property / value
 */
BfArray.removeByProp = function(property: string, value: any) {
  const index = this.findIndex(item => !!item && item[property] === value);
  if (index >= 0) {
    return this.splice(index, 1);
  } else {
    return undefined;
  }
};

/**
 * @memberOf BfArray
 * @description Converts an array to an object, pairing each index to a key-value entry
 *              Every index of the array should be another array with [key, value] items
 *              Ex:
 *              [['p1', 1 ], ['p2', 2], ['p3', false]].toObject() --> { p1: 1, p2: 2, p3: false }
 *              ['p1', 'p2', 'p3'].toObject() --> { p1: null, p2: null, p3: null }
 */
BfArray.toObject = function(): Object {
  const obj = {};
  this.forEach(item => {
    if (typeof item === 'string' || typeof item === 'number') {
      obj[item] = null;   // take just the object name

    } else {  // Every item has to be: [key, val] or [key]
      if (Array.isArray(item) && item.length > 0 && (typeof item[0] === 'string' || typeof item[0] === 'number')) {
        obj[item[0]] = item.length > 1 ? item[1] : null;
      }
    }
  });
  return obj;
};


/**
 * @memberOf BfArray
 * @param compareFn - Iterator function to perform a custom comparison. Return true = it's a duplicate
 * @description Remove all duplicated items in the array. This mutates the array.
 *              By default it uses isEqualTo function to determine whether 2 items are equal
 *              Ex:
 *                    arr.removeDuplicates();
 *                    arr.removeDuplicates((a, b) => a.id === b.id);
 */
BfArray.removeDuplicates = function(compareFn?: (itemA: any, itemB: any) => boolean) {
  if (!this || this.length < 2) { return this; }
  const arr = compareFn ? Array.from(this) : Array.from(new Set(this)); // Remove primitive duplicates (if no fn)
  this.splice(0); // Remove all items from the array

  // Move items from arr[] --> this[], if they are uniques
  compareFn = compareFn || isEqualTo;
  arr.forEach(itemA => {
    let isUnique = true;
    for (const itemB of this) {
      if (compareFn(itemA, itemB)) { isUnique = false; break; }
    }
    if (isUnique) { this.push(itemA); }
  });
  return this;
};


/**
 * @memberOf BfArray
 * @description Deep copy (clone) - Makes an exact copy of the array (no references) and returns it
 */
BfArray.dCopy = arrayDeepCopy;

/**
 * @memberOf BfArray
 * @description It compares to another array (recursively)
 */
BfArray.isEqualTo = function(arr2) { return isEqualTo(this, arr2); };

export default BfArray;
