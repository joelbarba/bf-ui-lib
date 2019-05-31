// bf-textarea = 'bf-btn'
// BfTextarea = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-textarea-demo]',
  templateUrl: './bf-textarea-demo.component.html',
  styleUrls: ['./bf-textarea-demo.component.scss']
})
export class BfTextareaDemoComponent implements OnInit {
  public name = BfTextareaDoc.name;
  public desc = BfTextareaDoc.desc;
  public api = BfTextareaDoc.api;
  public instance = BfTextareaDoc.instance;

  public instance2 = 
`<bf-textarea</bf-textarea>`;

  constructor() { }

  ngOnInit() { }

}


export const BfTextareaDoc = {
  name    : `bf-textarea`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text`,
  instance: `<bf-textarea></bf-textarea>`, 
  demoComp: BfTextareaDemoComponent
};