import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bf-btn-demo',
  templateUrl: './bf-btn-demo.component.html',
  styleUrls: ['./bf-btn-demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfBtnDemoComponent implements OnInit {
  public name = BfBtnDoc.name;
  public desc = BfBtnDoc.desc;
  public api = BfBtnDoc.api;
  public instance = BfBtnDoc.instance;

  public instance2 = `<bf-btn bfText="Add User"  (onClick)="myFunc($event)" [bfDisabled]="false"></bf-btn>
<bf-btn bfText="Save User" (onClick)="myFunc($event)" [bfDisabled]="true"></bf-btn>`;
  public instance3 = `<bf-btn bfText="Add User" bfIcon="icon-eye" (onClick)="myFunc($event)"></bf-btn>`;
  public instance4 = `<bf-btn bfType="save"    bfText="Save User"   (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfType="add"     bfText="Add User"    (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfType="delete"  bfText="Delete User" (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfType="cancel"  bfText="Cancel"      (onClick)="myFunc($event)"></bf-btn>
<bf-btn class="squash" bfType="expand"></bf-btn>
<bf-btn class="squash" bfType="collapse"></bf-btn>
`;
  public instance5 = `<bf-btn bfText="Primary"    bfType="primary"    (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfText="Secondary"  bfType="secondary"  (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfText="Tertiary"   bfType="tertiary"   (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfText="Quaternary" bfType="quaternary" (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfText="Warning"    bfType="warning"    (onClick)="myFunc($event)"></bf-btn>
<bf-btn bfText="Extra"      bfType="extra"      (onClick)="myFunc($event)"></bf-btn>`

public cssReset =
`$bf-colors: (
  "primary"     : $primary_color,
  "secondary"   : $secondary_color,  
  "tertiary"    : $tertiary_color,   
  "quaternary"  : $quaternary_color, 
  "warning"     : $warning_color,    
  "extra"       : $extra_color,      
  "white"       : $white,
);          

// Button color reset
@mixin btn-color-mixin($btn-color) {
  color: $white;
  background: $btn-color;
  .btn-icon-section { background: darken($btn-color, 5%); }
  .btn-icon-section.small-btn { background: $btn-color; } // If icon btn
  &:hover:not(:disabled) {
    background: darken($btn-color, 3%);
    .btn-icon-section { background: darken($btn-color, 7%); }
  }
}
@each $color, $value in $bf-colors { .#{$color}.bf-btn  { @include btn-color-mixin($value); } }`;

public squashExample = `<bf-btn class="squash" bfType="expand"></bf-btn>`;
public fullWidthExample = `<bf-btn class="full-width" bfText="Full Width Button"></bf-btn>`;


  constructor() { }
  ngOnInit() { }
  public count = '';
}





export const BfBtnDoc = {
  name    : `bf-btn`,
  desc    : `Generates a button.`, 
  api     : `[bfText]     : Text of the button
[bfType]     : Class of the button [primary, secondary, tertiary, quaternary, warning, extra] or predefined type [add, save, edit, delete, cancel, expand, collapse]
[bfDisabled] : True=Button is disabled, False=Enabled
[bfIcon]     : Icon of the button (icomoon class)
(onClick)    : Click event handler`,
  instance: `<bf-btn bfType="edit" (onClick)="myFunc($event)"></bf-btn>`, 
  demoComp: BfBtnDemoComponent
}