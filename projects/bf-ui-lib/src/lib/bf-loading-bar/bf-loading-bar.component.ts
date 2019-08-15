import { Component, OnInit } from '@angular/core';
import { BfLoadingBarService } from './bf-loading-bar.service';

@Component({
  selector: 'bf-loading-bar',
  templateUrl: './bf-loading-bar.component.html',
  styleUrls: ['./bf-loading-bar.component.scss']
})
export class BfLoadingBarComponent implements OnInit {

  constructor(public loadingBar: BfLoadingBarService) { }

  ngOnInit() {
  }

}
