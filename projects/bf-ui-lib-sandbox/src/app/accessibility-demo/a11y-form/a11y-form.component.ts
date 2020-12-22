import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a11y-form',
  templateUrl: './a11y-form.component.html',
  styleUrls: ['./a11y-form.component.sass']
})
export class A11yFormComponent implements OnInit {

  public item: any = {};
  public list = [{id: '1'},{id: '2'},{id: '3'},{id: '4'}];
  public buttonClicked = false;
  public blockPr;
  public bfAsyncAriaLabel;

  constructor() { }

  ngOnInit(): void {
  }

  clickButton() {
    console.log('click button');
  }

  public asyncClick() {
    this.bfAsyncAriaLabel = 'Fetching Data';
    return this.blockPr = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        this.bfAsyncAriaLabel = null;
      }, 5000);
    });
  }

}
