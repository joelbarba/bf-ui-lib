// Export functions to extend the Array prototype
import { arrayDeepCopy } from './deep-copy';

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
    // TODO:
    // To use await in a forEach --> https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
    // asyncForEach(callback: Function): Array<T>;
  }
}


const BfArray: any = {}; // Wrap all functions here

/**
 * @function getById
 * @memberOf Array
 * @param {String} id - Value of the ID property of the object to match
 * @description Returns the first object (if any) in the array that matches by .id. Undefined if not found.
 * */
BfArray.getById = function(id: any) {
  return this.find(item => item['id'] === id);
};

/**
 * @function getByProp
 * @memberOf BfArray
 * @param {String} property - the name of the objects property
 * @param {String} value - Value of the property of the object to match
 * @description Returns the first object (if any) in the array that matches the given property / value.
 *              Undefined if not found.
 * */
BfArray.getByProp = function(property: string, value: any) {
  return this.find(item => item[property] === value);
};

/**
 * @function getIndexById
 * @memberOf BfArray
 * @param {String} id - Value of the ID property of the object to match
 * @description returns the index of the first object (if any) in the array that matches by .id. If not -1
 * */
BfArray.getIndexById = function(id: any): number {
  return this.findIndex(item => item['id'] === id);
};

/**
 * @function getLast
 * @memberOf BfArray
 * @description Returns the last element of the array, or undefined if it's empty
 * */
BfArray.getLast = function() {
  if (!!this.length) {
    return this[this.length - 1];
  } else {
    return undefined;
  }
};

/**
 * @function getKeyById
 * @memberOf Array
 * @param {String} keyName - name of the property of the object to return
 * @param {String} id - the value of the ID of the object we want to match
 * @description Gets an object by its ID and returns a selected property of it (if present).
 * */
BfArray.getKeyById = function(keyName: string, id: any) {
  const obj = this.find(item => item['id'] === id);
  if (!keyName) { return obj; }
  if (!!obj && obj.hasOwnProperty(keyName)) {
    return obj[keyName];
  } else {
    return undefined;
  }
};

/**
 * @function getKeyByProp
 * @memberOf Array
 * @param {String} keyName - name of the property of the object to return
 * @param {String} property - name of the property to match by
 * @param {String} value - the value we want it to equal
 * @description Gets an object by matching by "property" and returns its selected property (keyName).
 * */
BfArray.getKeyByProp = function(keyName: string, property: string, value: any) {
  const obj = this.find(item => item[property] === value);
  if (!keyName) { return obj; }
  if (!!obj && obj.hasOwnProperty(keyName)) {
    return obj[keyName];
  } else {
    return undefined;
  }
};

/**
 * @function removeById
 * @memberOf BfArray
 * @param {String} id - Value of the ID property of the object to match
 * @description removes the first object (if any) in the array that matches by .id
 * */
BfArray.removeById = function(id: any) {
  const index = this.findIndex(item => item['id'] === id);
  if (index >= 0) {
    return this.splice(index, 1);
  } else {
    return undefined;
  }
};

/**
 * @function removeById
 * @memberOf BfArray
 * @param {String} property - the name of the objects property
 * @param {String} value - Value of the property of the object to match
 * @description removes the first object (if any) in the array that matches by property / value
 * */
BfArray.removeByProp = function(property: string, value: any) {
  const index = this.findIndex(item => item[property] === value);
  if (index >= 0) {
    return this.splice(index, 1);
  } else {
    return undefined;
  }
};

/**
 * @function dCopy
 * @memberOf BfArray
 * @description Deep copy (clone) - Makes an exact copy of the array (no references) and returns it
 */
BfArray.dCopy = arrayDeepCopy;

export default BfArray;
