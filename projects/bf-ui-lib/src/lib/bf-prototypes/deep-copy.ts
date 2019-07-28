// Related functions dCopy on Array & Object
export { arrayDeepCopy };
export { objectDeepCopy };

/**
 * @function arrayDeepCopy
 * @description Deep copy (clone) - Makes an exact copy of the array (no references) and returns it
 */
function arrayDeepCopy() {
  let newArray = [];
  this.forEach(item => {

    if (item !== null && Array.isArray(item)) {
      newArray.push(arrayDeepCopy.call(item));  // Deep array copy

    } else if (item !== null && typeof item === 'object') {
      newArray.push(objectDeepCopy.call(item));  // Deep object copy

    } else {
      newArray.push(item); // Primitive
    }
  });
  return newArray;
}


/**
 * @function objectDeepCopy
 * @description It returns a deep copy of the object (no references at any level)
 */
function objectDeepCopy() {
  let newObj = {};
  for (let keyName in this) { // Loop all object properties
    if (this.hasOwnProperty(keyName)) { // Exclude prototypes
      const value = this[keyName];
      if (value !== null && Array.isArray(value)) {
        newObj[keyName] = arrayDeepCopy.call(value);  // Deep array copy

      } else if (value !== null && typeof value === 'object') {
        newObj[keyName] = objectDeepCopy.call(value);  // Deep object copy

      } else {
        newObj[keyName] = value;
      }
    }
  }
  return newObj
}
