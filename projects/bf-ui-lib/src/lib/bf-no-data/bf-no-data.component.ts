import {Component, Input} from '@angular/core';

/**
 * @ngdoc component
 * @description Generates a row with a "No data to show" alert message or a No data with a big
 * If it is a placeholder for empty lists, it styles the alert without background and displaying
 * more options (icon, title, description)
 *
 */
@Component({
  selector: 'bf-no-data',
  templateUrl: './bf-no-data.component.html'
})
export class BfNoDataComponent {
  @Input() bfMessage = 'view.common.no_data_to_show';

  @Input() bfIsPlaceholder = false;    // If true, a placeholder styled message is displayed instead
  @Input() bfIcon: string = null;
  @Input() bfTitle = '';          // (eg: No messages yet)
  @Input() bfDescription = '';    // (eg: Click to add a new bla bla)

  constructor() { }
}
