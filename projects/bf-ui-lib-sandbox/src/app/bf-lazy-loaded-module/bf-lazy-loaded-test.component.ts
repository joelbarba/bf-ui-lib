import {Component, OnInit } from '@angular/core';

console.log('BfLazyLoadedTestComponent', new Date());

@Component({
  selector: 'bf-lazy-loaded-test',
  templateUrl: './bf-lazy-loaded-test.component.html',
  styleUrls: ['./bf-lazy-loaded-test.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfLazyLoadedTestComponent implements OnInit {
  public myVal = '';
  constructor() {}

  ngOnInit() { }

}

