// Export functions to extend the Object prototype
import { objectDeepCopy } from './deep-copy';
import { isEqual } from './deep-equal';

declare global {
  interface Object {
    keyFilter(filterFn: ((val?, key?) => boolean) | string): Partial<Object>;
    keyMap(props: string): Object;
    // keyMap(mapFn: (val?, key?) => any): Object;
    keyCount(): number;
    peel(prefix?: string): Partial<Object>;
    isEqual(obj2: Object): boolean;
    updateFrom(Object): void;
    cloneProp(propName: string, fromObject: Object): Object;
    dCopy(): Object;
  }
}

const BfObject: any = {}; // Wrap all functions here

/**
 * @ngdoc Object.prototype
 * @description Filter out object properties. Given an iterator function, it removes the property if returning false
 *              If filtering by key names, it's also possible to directly pass an string with the names
 * @example   var myObj1 = { id: 0, name: null, $age: 15 };
 *            myObj.keyFilter(val => val !== null);         // Returns { id: 0, $age: 15 };
 *            myObj.keyFilter((val, key) => key !== 'id');  // Returns { name: null, $age: 15 };
 *            myObj.keyFilter('id, name');                  // Returns { id: 1, name: null };
 */
BfObject.keyFilter = function(filterFn: ((val?, key?) => boolean) | string): Partial<Object> {
  const newObj = {};
  if (typeof filterFn === 'function') {
    Object.entries(this).forEach(([key, val]) => !!filterFn(val, key) && (newObj[key] = val));

  } else if (typeof filterFn === 'string') {
    filterFn.replace(/[ ]/g, '').split(',')
      .filter(key => this.hasOwnProperty(key))
      .forEach(key => newObj[key] = this[key]);
  }
  return newObj;
};


// Temporary fallback to support old logic until all instances changed
BfObject.keyMap = function(props: string): Partial<Object> {
  return BfObject.keyFilter.call(this, props);
};
/**
 * @ngdoc Object.prototype
 * @description Iterates all properties on the object, mapping a new value
 * @example  const b = a.keyMap(val => !!val ? val : null);
 *           const c = a.keyMap((val, key) => key === 'id' ? null: val);
 */
// BfObject.keyMap = function(mapFn) {
//   const newObj = {};
//   Object.entries(this).forEach(([key, val]) => newObj[key] = mapFn(val, key));
//   return newObj;
// };

/**
 * @ngdoc Object.prototype
 * @description Returns then number of keys on the object
 */
BfObject.keyCount = function() {
  return Object.keys(this).filter(key => this.hasOwnProperty(key)).length;
};


/**
 * @ngdoc Object.prototype
 * @description It returns the object without those properties that are null or undefined
 *              obj.peel() === obj.keyFilter(k => k !== null && k !== undefined)
 */
BfObject.peel = function() {
  const newObj = {};
  Object.keys(this).forEach(key => {
    if (this[key] !== undefined && this[key] !== null) { newObj[key] = this[key]; }
  });
  return newObj;
};

/**
 * @ngdoc Object.prototype
 * @description It compares to another objects, going down recursively to all their properties
 */
BfObject.isEqual = function(obj2) {
  return isEqual(this, obj2);
};

/**
 * @ngdoc Object.prototype
 * @description OBJECT MUTATION! Updates those keys that also exist in the passed object.
 *              It ignores the rest (doesn't add or delete non existing key)
 *              obj1 = { a: 1, b: 2 };  obj2 = { a, 30, c: 40 };
 *              obj1.setFrom(obj2) --> { a: 30, b: 2 };
 */
BfObject.updateFrom = function(fromObj) {
  Object.entries(fromObj).forEach(([key, val]) => {
    if (this.hasOwnProperty(key)) { this[key] = val; }
  });
  // const newObj = {};
  // Object.entries(this).forEach(([key, val]) => newObj[key] = val);
  // Object.entries(fromObj).forEach(([key, val]) => {
  //   if (this.hasOwnProperty(key)) { newObj[key] = val; }
  // });
  // return newObj;
};



/**
 * @ngdoc Object.prototype
 * @description OBJECT MUTATION! Clones a property from an other object to itself.
 *              If that value is null / undefined, or not found on the other object, it deletes the property of the object.
 * @param propName       ? String - Name of the property to copy
 * @param fromObject     ? Object - Object from where to copy to property
 * @example
 *      var myObj1 = { age: 10 };
 *      myObj1.cloneProp('name', { name: 'Sam' });  // --> Adds myObj.name = 'Sam'
 *      myObj1.cloneProp('age', { name: 'Sam' });   // --> Deletes myObj.age
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
 * @description It returns a deep copy of the object (no references at any level)
 * @example myObj2 = myObj1.dCopy();
 */
BfObject.dCopy = objectDeepCopy;


export default BfObject;
