import {Component, Input, OnInit} from '@angular/core';

/**
 * @ngdoc component
 * @description Generates a row with a "No data to show" alert message or a No data with a big
 * icon if an illustration is set as attribute
 *
 * icon -> icon to use on the illustration if not set default will be used
 * message -> the message to display under the icon or in the row placeholder
 * description -> text below the message, usually used to describe the action onClick
 * illustration -> if present we display icon + label as attribute
 * smaller -> if present as an attribute the size of the icon will be 1/2 as attribute
 *
 */
@Component({
  selector: 'bf-no-data',
  templateUrl: './bf-no-data.component.html'
})
export class BfNoDataComponent implements OnInit {
  @Input() bfMessage = 'view.common.no_data_to_show';
  @Input() bfDescription: string;
  @Input() bfIcon: string;

  constructor() { }

  ngOnInit() { }
}
