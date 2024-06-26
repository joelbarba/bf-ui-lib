declare global {
  interface Number {
    isIn(list: Array<number>): number;
  }
}

const BfNumber: any = {}; // Wrap all functions here

/**
 * @memberOf Number
 * @param list - List of numbers
 * @description Returns true if there is any instance of the current number into the list
 */
BfNumber.isIn = function(list: Array<number>): boolean {
  return (list.indexOf(this.valueOf()) >= 0);
};

export default BfNumber;
