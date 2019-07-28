declare global {
  interface String {
    isIn(list: Array<string>): boolean;
  }
}

const BfString: any = {}; // Wrap all functions here

/**
 * @function isIn
 * @memberOf String
 * @param {Array<string>} list - List of strings
 * @description Returns true if there is any instance of the current string into the list
 * */
BfString.isIn = function(list: Array<string>): boolean {
  return (list.indexOf(this.valueOf()) >= 0);
};

export default BfString;
