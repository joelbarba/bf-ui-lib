export enum DropdownListStatus {
  EMPTY,              // When there hasn't been any fetchItems() yet
  PARTIALLY_LOADED,   // When some items loaded, but length < count
  FULLY_LOADED,       // When all items are loaded (length == count) but with a backend filter
  COMPLETELY_LOADED,  // When everything is loaded (length == count) and there is no filter
}
