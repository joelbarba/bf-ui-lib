// bf-autocomplete = 'bf-btn'
// BfAutocomplete = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-autocomplete-demo',
  templateUrl: './bf-autocomplete-demo.component.html',
  styleUrls: ['./bf-autocomplete-demo.component.scss']
})
export class BfAutocompleteDemoComponent implements OnInit {
  name = BfAutocompleteDoc.name;
  desc = BfAutocompleteDoc.desc;
  api = BfAutocompleteDoc.api;
  instance = BfAutocompleteDoc.instance;
  cssReset = BfAutocompleteDoc.cssReset;

  // bf-autocomplete customization parameters
  stringSelected;
  stringList: Array<string> = [
    'Pinot Grigio Zagalia',
    'Domaine de Tariquet, Cotes de Gascogne',
    'Mancura Etnia, Sauvignon Blanc',
    'Macon Lugny Burgundy',
    'Pulpo Albarino',
    'Prova Reiga Arinto',
    'Domaine La Combette, Granache Rose',
    'Zagalia Montepulciano D\'Abruzzo',
    'Mancura Etnia, Cabernet Sauvignon',
    'Bouchard, Pinot Noir',
    'Masseria del Fauno, Puglia, Primitivo',
    'Cote du Ventoux, Delas Freres',
    'Lurton Bodega, Malbec',
    'Four Sisters, Shiraz',
    'Fattoria di Basciano, Chianti Rufina',
  ];
  validTypes = [
    { id: 'integer',  text: 'integer',  },
    { id: 'number',   text: 'number',   },
    { id: 'decimal',  text: 'decimal',  },
    { id: 'email',    text: 'email',    },
  ];
  compConf: any = {
    isRequired: false,
    isDisabled: false,
    rows: null,
    hasLabel: false,
    labelText: 'My Description',
    hasPlaceholder: false,
    placeholderText: 'My Placeholder',
    hasTooltip: false,
    tooltipText: 'Hello World',
    tooltipPos: null,
    tooltipBody: false,
    validType: null
  };
  customCompCode = `<bf-dropdown [(ngModel)]="stringSelected" [bfList]="stringList"></bf-dropdown>`;

  emailList;
  selectedEmail;
  userList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba', icon: 'icon-smile2', img: 'assets/language-flags/ca.png' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen', icon: 'icon-home',          img: 'assets/language-flags/de.png' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen', icon: 'icon-office',        img: 'assets/language-flags/ja.png' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen', icon: 'icon-thumbs-up',     img3: 'assets/language-flags/cn.png' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen', icon: 'icon-phone2',        img: 'assets/language-flags/da.png' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen', icon: 'icon-bell2',         img: 'assets/language-flags/cat.png' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen', icon: 'icon-user',          img: 'assets/language-flags/el.png' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen', icon: 'icon-users',         img: 'assets/language-flags/es.png' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen', icon: 'icon-lock',          img: 'assets/language-flags/fi.png' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen', icon: 'icon-teapot',        img: 'assets/language-flags/fr.png' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen', icon: 'icon-plus',          img: 'assets/language-flags/gb.png' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen', icon: 'icon-minus',         img: 'assets/language-flags/ie.png' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen', icon: 'icon-notification2', img: 'assets/language-flags/it.png' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen', icon: 'icon-warning2',      img: 'assets/language-flags/ja.png' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen', icon: 'icon-checkmark',     img: 'assets/language-flags/nl.png' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen', icon: 'icon-rocket',        img: 'assets/language-flags/no.png' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen', icon: 'icon-bin',           img: 'assets/language-flags/pl.png' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen', icon: 'icon-shield',        img: 'assets/language-flags/pt.png' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen', icon: 'icon-switch',        img: 'assets/language-flags/sv.png' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen', icon: 'icon-list',          img: 'assets/language-flags/tw.png' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen', icon: 'icon-tree6',         img: 'assets/language-flags/us.png' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen', icon: 'icon-earth2',        img: 'assets/language-flags/zh.png' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen', icon2: 'icon-menu3',        img2: 'assets/language-flags/ca.png' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen', icon: 'icon-link',          img: 'assets/language-flags/de.png' },
  ];

  upComp() {
    const brStr = `\n`;
    const bsStr = `\n             `;
    this.customCompCode = `<bf-autocomplete `;

    let compClasses = '';
    if (this.compConf.hasFullWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'full-width'; }
    if (this.compConf.hasSquash)    { compClasses += (!!compClasses.length ? ' ' : '') + 'squash'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + bsStr;
    }
    this.customCompCode += `[(ngModel)]="stringSelected"` + bsStr;
    this.customCompCode += `[bfList]="stringList"`;

    if (this.compConf.hasLabel)   { this.customCompCode += bsStr + `bfLabel="${this.compConf.labelText}"`; }
    if (this.compConf.hasPlaceholder)   { this.customCompCode += bsStr + `bfPlaceholder="${this.compConf.placeholderText}"`; }
    if (this.compConf.isRequired) { this.customCompCode += bsStr + `[bfRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += bsStr + `[bfDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    if (this.compConf.validType)    { this.customCompCode += bsStr + `bfValidType="${this.compConf.validType}"`; }

    this.customCompCode += (`>` + brStr + `</bf-autocomplete>`);
  }

  mapUserList() {
    this.emailList = this.userList.map(item => (`${item.username} <${item.email}>`));
  }

  unmapUser(value) {
    const user = this.userList.find(item => value === `${item.username} <${item.email}>`);
    if (user) {
      return user;
    } else {
      return value;
    }
  }

  onSelectEmail(value) {
    console.log('Value from ngModelChange', value);
  }

  constructor() { }

  ngOnInit() {
    this.mapUserList();
  }

}

export const BfAutocompleteDoc = {
  name    : `bf-autocomplete`,
  uiType  : 'component',
  desc    : `Generates a ....`,
  api     : `[(ngModel)]:
[bfList]: Array<string> the list of options to display`,
  cssReset: `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.bf-autocomplete-form-group {
  ...
}`,
  instance: `<bf-autocomplete
    [(ngModel)]="selectedEmail"
    [bfList]="emailList"
    bfLabel="Select/type a contact"
    bfPlaceholder="Select/type a contact"
></bf-autocomplete>`,
  demoComp: BfAutocompleteDemoComponent
};
