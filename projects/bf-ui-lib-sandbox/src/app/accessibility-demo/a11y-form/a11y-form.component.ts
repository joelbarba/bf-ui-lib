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
  constructor() { }

  ngOnInit(): void {
  }

  clickButton() {
    console.log('click button');
  }

}
