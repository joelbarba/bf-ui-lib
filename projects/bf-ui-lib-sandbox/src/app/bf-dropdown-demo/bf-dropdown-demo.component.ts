// bf-dropdown = 'bf-btn'
// BfDropdown = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-dropdown-demo]',
  templateUrl: './bf-dropdown-demo.component.html',
  styleUrls: ['./bf-dropdown-demo.component.scss']
})
export class BfDropdownDemoComponent implements OnInit {
  public name = BfDropdownDoc.name;
  public desc = BfDropdownDoc.desc;
  public api = BfDropdownDoc.api;
  public instance = BfDropdownDoc.instance;
  public myList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba'},
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen' },
  ];

  public selObj = { "id": 2, "username": "syrax", "email": "syrax@targaryen.com", "first_name": "Syrax", "last_name": "Targaryen" };
  public selObj2;
  public selObj3;
  public selObj4;
  public selObj5;

  public instance2 =
`<bf-dropdown [(ngModel)]="selObj" [bfList]="myList" bfSelect="username" bfRender="email">
</bf-dropdown>`;

  public instance3 =
`<bf-dropdown [(ngModel)]="selObj"
             [bfList]="myList"
             bfSelect="username, first_name, last_name"
             bfRender="$$$ $item.first_name + ' ' + $item.last_name + ' (' + $item.email + ')'">
</bf-dropdown>`;

  public instance4 =
`<bf-dropdown [(ngModel)]="selObj" 
             [bfList]="myList"
             bfRender="email" 
             bfLabel="Email"
             [bfRequired]="true" 
             [bfDisabled]="false">
</bf-dropdown>`;




  public brStr = `
`;
  public bsStr = `
             `;
  public customDropdownCode = `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`;
  public res = ``;
  public selObj10;
  public compConf:any = {
    isRequired: false,
    isDisabled: false,
    hasSelect: false,  selectField: 'username',
    hasRender: false,  renderExp: `$$$ $item.id + ' - ' + $item.username`,
    hasLabel: false,   labelText: 'Dragon of the year',
    hasFullWidth: true,
  };
  public customExLinked = true;  // To link / unlink component
  public compSelFields = [{id: 'id'},{id: 'username'},{id: 'email'},{id: 'first_name'},{id: 'last_name'}];
  public upComp = () => {
    this.customDropdownCode = `<bf-dropdown `;


    let compClasses = '';
    if (this.compConf.hasFullWidth) { compClasses = 'full-width'; }
    // if (this.compConf.hasSquash) {
    //   if (!!compClasses) { compClasses += ' '; }
    //   compClasses += 'squash';
    // }
    if (!!compClasses) {
      this.customDropdownCode += `class="${compClasses}"` + this.bsStr;
    }
    this.customDropdownCode += `[(ngModel)]="selObj"` + this.bsStr;
    this.customDropdownCode += `(ngModelChange)="doSomething($event)"` + this.bsStr;
    this.customDropdownCode += `[bfList]="myList"`;

    if (this.compConf.isRequired) {
      this.customDropdownCode += this.bsStr + `[bfRequired]="true"`;
    }
    if (this.compConf.isDisabled) {
      this.customDropdownCode += this.bsStr + `[bfDisabled]="true"`;
    }

    if (this.compConf.hasLabel) {
      this.customDropdownCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`;
    }

    if (this.compConf.hasSelect && !!this.compConf.selectField) {
      this.customDropdownCode += this.bsStr + `bfSelect="${this.compConf.selectField}"`;
    }

    if (this.compConf.hasRender) {
      this.customDropdownCode += this.bsStr + `bfRender="${this.compConf.renderExp}"`;
      this.customExLinked = false;
      setTimeout(() => { this.customExLinked = true; });
    }
    this.customDropdownCode += (`>` + this.brStr + `</bf-dropdown>`);
  };
  public mockAutoSelect = () => {
    this.selObj10 = {...this.myList.getById('13')};
  };

  constructor() { }

  ngOnInit() { }




}


export const BfDropdownDoc = {
  name    : `bf-dropdown`,
  uiType  : 'component',
  desc    : `Generates a dropdown using <select> and <option> html tags.`,
  api     : `*[(ngModel)]     : The ngModel directive is linked to the inner <select>, so that can be used as a form element with ngForm (status is propagated).  
*[bfList]        : Array of objects with the list to be displayed in the dropdown
[bfSelect]       : The name of the property to be selected from the object of the list. If empty, all object selected. If multiple props add a keyMap list ('prop1, prop2, ...')
[bfRender]       : Field to display on the list (property from bfList items).
                   If empty, a row with all properties will be displayed.
                   It can also be an eval() expression. Start with a '$$$' and use $item reference for eval. Example: bfRender="$$$ $item.first_name + ' ' + $item.last_name"    
[bfRequired]     : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[bfDisabled]     : Whether the selector is disabled or not
[bfLabel]        : If provided, a <bf-label> is added above the selector with the given text`,
  instance: `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`,
  demoComp: BfDropdownDemoComponent
};
