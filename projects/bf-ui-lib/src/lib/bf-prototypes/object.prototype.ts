// Export functions to extend the Object prototype
import { objectDeepCopy } from "./deep-copy";

declare global {
  interface Object {
    keyMap(propNames: string): Object;
    dCopy(): Object;
    cloneProp(propName: string, fromObject: Object): Object;

    // TODO:
    // Stripes out all properties with prefix ($ by default)
    // peel(prefix?: string): Partial<Object>;
  }
}

const BfObject: any = {}; // Wrap all functions here

/**
 * @ngdoc Object.prototype
 * @name keyMap
 * @description It returns the same object but only with the selected properties
 * @param propNames ? String - String with the names of the properties to select, seperated by ','. Spaces will be ignored
 * @example
 *      var myObj1 = { id: 1, name: 'Sam', age: 10, isValid: true };
 *      myObj1.keyMap('id, name');  // --> Returns an object = { id: 1, name: 'Sam' };
 *      myObj1.keyMap('id, age, isValid');  // --> Returns an object = { id: 1, age: 10, isValid:true };
 */
BfObject.keyMap = function(propNames: string) {
  let newObj = {};
  if (!!propNames && typeof propNames === 'string') {
    propNames.replace(/[ ]/g, '').split(',').forEach(keyName => {
      newObj[keyName] = this[keyName];
    });
  }
  return newObj;
};


/**
 * @ngdoc Object.prototype
 * @name cloneProp
 * @description Clones a property from an other object to itself.
 *              If that value is null / undefined, or not found on the other object, it deletes the property of the object.
 * @param propName       ? String - Name of the property to copy
 * @param fromObject     ? Object - Object from where to copy to property
 * @example
 *      var myObj1 = { age: 10 };
 *      myObj1.copyStrict('name', { name: 'Sam' });  // --> Adds myObj.name = 'Sam'
 *      myObj1.copyStrict('age', { name: 'Sam' });   // --> Deletes myObj.age
 */
BfObject.cloneProp = function(propName: string, fromObject: Object) {
  if (!!propName) {
    if (!!fromObject && fromObject.hasOwnProperty(propName) && fromObject[propName] !== null && fromObject[propName] !== undefined) {
      this[propName] = fromObject[propName];
    } else {
      delete this[propName];
    }
  }
  return this;
};


/**
 * @ngdoc Object.prototype
 * @name copy
 * @description It returns a deep copy of the object (no references at any level)
 * @example myObj2 = myObj1.dCopy();
 */
BfObject.dCopy = objectDeepCopy;


export default BfObject;
