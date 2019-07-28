// Export functions to extend the Array prototype
import { arrayDeepCopy } from "./deep-copy";

declare global {
  interface Array<T> {
    getById(id: any): T | undefined;
    getByProp(property: string, value: any): T | undefined;
    getIndexById(id: any): number;
    removeById(id: any): T | undefined;
    removeByProp(property: string, value: any): T | undefined;
    getLast(): T | undefined;
    dCopy(): Array<T>;
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
 * @function removeById
 * @memberOf BfArray
 * @param {String} id - Value of the ID property of the object to match
 * @description removes the first object (if any) in the array that matches by .id
 * */
BfArray.removeById = function(id: any) {
  return BfArray.removeByProp.call(this, 'id', id);
};

/**
 * @function removeById
 * @memberOf BfArray
 * @param {String} property - the name of the objects property
 * @param {String} value - Value of the property of the object to match
 * @description removes the first object (if any) in the array that matches by property / value
 * */
BfArray.removeByProp = function(property: string, value: any) {
  let selectedItem = BfArray.getByProp.call(this, property, value);
  if (!!selectedItem) {
    let index = this.indexOf(selectedItem);
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
