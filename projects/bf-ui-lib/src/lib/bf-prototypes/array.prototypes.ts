// Export functions to extend the Array prototype

declare global {
  interface Array<T> {
    getById(id: any): T | null;
    getByProp(property: string, value: any): T | null;
    getIndexById(id: any): number;
    removeById(id: string): T | null;
    dCopy(): Array<T>;
  }
}

const BfArray: any = {}; // Wrap all functions here

/**
 * @function getById
 * @memberOf Array
 * @param {String} id - Value of the ID property of the object to match
 * @description returns the first object (if any) in the array that matches by .id
 * */
BfArray.getById = function(id: string) {
  return BfArray.getByProp.call(this, 'id', id);
};

/**
 * @function getByProp
 * @memberOf BfArray
 * @param {String} property - the name of the objects property
 * @param {String} value - Value of the property of the object to match
 * @description returns the first object (if any) in the array that matches the given property / value
 * */
BfArray.getByProp = function(property: string, value: any) {
  for (let ind = 0; ind < this.length; ++ind) {
    if (this[ind].hasOwnProperty(property) && this[ind][property] === value) {
      return this[ind];
    }
  }
  return null;
};

/**
 * @function getIndexById
 * @memberOf BfArray
 * @param {String} id - Value of the ID property of the object to match
 * @description returns the index of the first object (if any) in the array that matches by .id. If not -1
 * */
BfArray.getIndexById = function(id: string): number {
  for (let ind = 0; ind < this.length; ++ind) {
    if (this[ind].hasOwnProperty('id') && this[ind]['id'] === id) {
      return ind;
    }
  }
  return -1;
};

/**
 * @function removeById
 * @memberOf BfArray
 * @param {String} id - Value of the ID property of the object to match
 * @description removes the first object (if any) in the array that matches by .id
 * */
BfArray.removeById = function(id: string) {
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
    return null;
  }
};

/**
 * @function dCopy
 * @memberOf BfArray
 * @description Deep copy (clone) - Makes an exact copy of the array (no references) and returns it
 * */
BfArray.dCopy = function() {
  let newArray = [];
  this.forEach(item => {

    if (item !== null && Array.isArray(item)) {
      newArray.push(BfArray.dCopy.call(item));  // Deep array copy

    } else if (item !== null && typeof item === 'object') {
      // newArray.push(BfArray.dCopy.call(this, item));  // Deep object copy
      newArray.push(item); // Primitive

    } else {
      newArray.push(item); // Primitive
    }
  });
  return newArray;
};



export default BfArray;
