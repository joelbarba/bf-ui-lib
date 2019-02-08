import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-list-header-col-demo]',
  templateUrl: './bf-list-header-col-demo.component.html',
  styleUrls: ['./bf-list-header-col-demo.component.scss']
})
export class BfListHeaderColDemoComponent implements OnInit {
  public name = BfListHeaderColDoc.name;
  public desc = BfListHeaderColDoc.desc;
  public api = BfListHeaderColDoc.api;
  public instance = BfListHeaderColDoc.instance;

  // public usersList;
  public usersList = [
    { id: 1, username: 'syrax',        email: '01.syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen' },
    { id: 2, username: 'vermithor',    email: '02.vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen' },
    { id: 3, username: 'sunfyre',      email: '03.sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen' },
    { id: 4, username: 'dreamfyre',    email: '04.dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen' },
    { id: 5, username: 'seasmoke',     email: '05.seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen' },
    { id: 6, username: 'arrax',        email: '06.arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen' },
    { id: 7, username: 'tyraxes',      email: '07.tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen' },
    { id: 8, username: 'moondancer',   email: '08.moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen' },
    { id: 9, username: 'greyghost',    email: '09.greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen' },
  ]
  public orderConf = {
    field: '', 
    reverse: false, 
    onChange: (fieldName) => {
      if (this.orderConf.field === fieldName) { 
        this.orderConf.reverse = !this.orderConf.reverse;
      }
      this.orderConf.field = fieldName;
      const ascNum = this.orderConf.reverse ? -1 : 1;
      this.usersList = this.usersList.sort((itemA, itemB) => {
        return (itemA[this.orderConf.field] > itemB[this.orderConf.field]) ? ascNum : -ascNum;
      });
    }
  }

  public instance2 = `<div class="col-12">
  <ul class="list-unstyled table-list">
    <li class="list-header">
      <div class="row">
        <bf-list-header-col class="col-3" [colTitle]="'Username'" [fieldName]="'username'" [orderConf]="orderConf"></bf-list-header-col>
        <bf-list-header-col class="col-3" [colTitle]="'Email'"    [fieldName]="'email'"    [orderConf]="orderConf"></bf-list-header-col>
        <bf-list-header-col class="col-3" [colTitle]="'First Name'"></bf-list-header-col>
        <bf-list-header-col class="col-3" [colTitle]="'Last Name'"></bf-list-header-col>
      </div>
    </li>

    <li *ngFor="let userItem of usersList" class="list-row">
      <div class="row">
        <div class="col-3"><h5>{{userItem.username}}</h5></div>
        <div class="col-3"><h5>{{userItem.email}}</h5></div>
        <div class="col-3"><h5>{{userItem.first_name}}</h5></div>
        <div class="col-3"><h5>{{userItem.last_name}}</h5></div>
      </div>
    </li>
  </ul>
</div>
`
  public instance3 = `public usersList = [...];
public orderConf = {
  field: '', 
  reverse: false, 
  onChange: (fieldName) => {
    if (this.orderConf.field === fieldName) { 
      this.orderConf.reverse = !this.orderConf.reverse;
    }
    this.orderConf.field = fieldName;
    const ascNum = this.orderConf.reverse ? -1 : 1;
    this.usersList = this.usersList.sort((itemA, itemB) => {
      return (itemA[this.orderConf.field] > itemB[this.orderConf.field]) ? ascNum : -ascNum;
    });
  }
}`;

  constructor() { }

  ngOnInit() { 
    this.orderConf.onChange('username');
  }

}


export const BfListHeaderColDoc = {
  name    : `bf-list-header-col`,
  desc    : `Generates the column header for a list. It also adds the options for ordering the list, showing the arrow icons next to the title`, 
  api     : `[colTitle]:  Text of the column title
[fieldName]: Column name. Name of the property that every object of the array has for that column. This is necessary if we want to apply order.
[orderConf]: If provided, the column will have order. This should be always linked to the same order config object for all columns of the list
             It is an object with the following properties:
             - field: string -> Name of the current column the list is ordered by
             - reversed: boolean -> Whether the current order is asc or desc
             - onChange: Function -> To call when the header is clicked to reorder the list. It accepts the field name
(onChange): Event to spread up the reorder event`,
  instance: `<bf-list-header-col></bf-list-header-col>`, 
  demoComp: BfListHeaderColDemoComponent
}