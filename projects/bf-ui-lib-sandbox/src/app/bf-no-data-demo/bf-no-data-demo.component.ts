import { Component, OnInit } from '@angular/core';
import {icomoonList} from '../icomoon-list';

@Component({
  selector: 'app-bf-no-data-demo',
  templateUrl: './bf-no-data-demo.component.html',
  styleUrls: ['./bf-no-data-demo.component.scss']
})
export class BfNoDataDemoComponent implements OnInit {
  public name = BfNoDataDoc.name;
  public desc = BfNoDataDoc.desc;
  public api = BfNoDataDoc.api;
  public instance = BfNoDataDoc.instance;

  public instance2 = `<div class="row whiteBg">
  <bf-no-data class="col-12"
              [bfIsPlaceholder]="true"
              bfIcon="icon-tape"
              bfTitle="view.voicemails.no_voicemails_title"
              bfDescription="view.voicemails.no_voicemails">              
  </bf-no-data>
</div>`;


  public cssReset = `$no-data-bg: darken($primary_color, 20%) !default;
$no-data-color: $white !default;
$placeholder-color: $primary !default`;

  public iconList = icomoonList;


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = `<bf-no-data></bf-no-data>`;
  public compConf: any = {
    bfMessage: 'view.common.username', hasLabel: false,
    isPlaceholder: true,
    bfIcon: 'icon-hour-glass',
    bfTitle: 'view.voicemails.no_voicemails_title',
    bfDescription: 'view.voicemails.no_voicemails',
    sizeClass: 'size-xl',
  };
  public upComp = () => {
    this.customCompCode = `<bf-no-data `;
    let compClasses = '';
    if (this.compConf.sizeClass !== 'size-xl') { compClasses += this.compConf.sizeClass; }
    if (!!compClasses) { this.customCompCode += `class="${compClasses}"` + this.bsStr; }

    if (!this.compConf.isPlaceholder) {
      if (this.compConf.hasLabel) { this.customCompCode += ` bfMessage="${this.compConf.bfMessage}"`; }

    } else {
      this.customCompCode += ` [bfIsPlaceholder]="true"`;
      if (this.compConf.bfIcon)        { this.customCompCode += this.bsStr + `bfIcon="${this.compConf.bfIcon}"`; }
      if (this.compConf.bfTitle)       { this.customCompCode += this.bsStr + `bfTitle="${this.compConf.bfTitle}"`; }
      if (this.compConf.bfDescription) { this.customCompCode += this.bsStr + `bfDescription="${this.compConf.bfDescription}"`; }

    }

    this.customCompCode += (`>` + this.brStr + `</bf-no-data>`);
  };





  constructor() { }

  ngOnInit() {
    this.upComp();
  }

}


export const BfNoDataDoc = {
  name    : `bf-no-data`,
  uiType  : 'component',
  desc    : `Generates an alert with the no data placeholder`,
  api     : `[bfMessage]       : The message to display (by default = 'view.common.no_data_to_show')
[bfIsPlaceholder] : (true/false) Whether to style as an empty list placeholder (true) or a "No Data" bg row (false) 
[bfIcon]          : If placeholder, the icon class to display
[bfTitle]         : If placeholder, the title (eg: No users yet)
[bfDescription]   : If placeholder, the description (eg: Click to add a new user)`,
  instance: `<div class="row whiteBg">
  <bf-no-data></bf-no-data>
</div>`,
  demoComp: BfNoDataDemoComponent
};
