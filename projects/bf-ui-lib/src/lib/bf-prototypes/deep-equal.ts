// Related functions dCopy on Array & Object
export { isEqual };
export { arrayIsEqual };
export { objectIsEqual };

/** @description Deep comparison of 2 object or arrays */
function isEqual(item1, item2, p1 = [], p2 = []) {
  if (typeof item1 !== 'object' || typeof item2 !== 'object') {
    return false; // primitives

  } else {
    if (Array.isArray(item1) && !Array.isArray(item2)) {
      return false; // cannot compare object to array
    } else {

      // Check if any circular reference to stop recursive loop
      for (const p of p1) { if (p === item1) { return item1 === item2; }}
      for (const p of p2) { if (p === item2) { return item1 === item2; }}
      p1.push(item1);
      p2.push(item2);

      if (Array.isArray(item1)) {
        return arrayIsEqual(item1, item2, p1, p2);
      } else {
        return objectIsEqual(item1, item2, p1, p2);
      }
    }
  }
}

/** @description It compares 2 arrays, item by item, and going down recursively if non primitives */
function arrayIsEqual(item1, item2, p1 = [], p2 = []) {
  if (item1.length !== item2.length) { return false; }  // Different length
  for (let ind = 0; ind < item1.length; ind ++) {
    if (item1[ind] !== item2[ind]) {
      if (!isEqual(item1[ind], item2[ind], p1, p2)) { return false; } // Check value match
    }
  }
  return true;
}


/** @description It compares 2 objects, going down recursively to all their properties */
function objectIsEqual(obj1, obj2, p1 = [], p2 = []) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) { return false; }  // Different number of properties
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) { return false; } // No key match
    if (obj1[key] !== obj2[key]) {
      if (!isEqual(obj1[key], obj2[key], p1, p2)) { return false; } // No value match
    }
  }
  return true;
}
