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
    dCopy(): Array<T>;
    isEqualTo(arr2: Array<any>): boolean;
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
 * @description Deep copy (clone) - Makes an exact copy of the array (no references) and returns it
 */
BfArray.dCopy = arrayDeepCopy;

/**
 * @memberOf BfArray
 * @description It compares to another array (recursively)
 */
BfArray.isEqualTo = function(arr2) { return isEqualTo(this, arr2); };

export default BfArray;
