import BfArray from "./array.prototypes";


const BfPrototypes = (list?: Array<string>) => {
  console.log('Running loadPrototypes');
  // Array.prototype.getById = BfArray.getById;

  // Extend Array prototype
  for (let proFnName in BfArray) {
    if (BfArray.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Array')) {
      console.log(`Extending Array prototype with --> .${proFnName}()`);
      Array.prototype[proFnName] = BfArray[proFnName];
    }
  }




  // Check if the prototype function name is in the list for the variable type
  function isFnInList(proFnName: string, varType: string) {
    return !list || !!list.filter(e => {
      const key = e.split('.');
      return (key.length >= 1 && key[0] === varType && key[1] === proFnName);
    }).length;
  }
};
export default BfPrototypes;

