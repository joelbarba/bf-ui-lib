import { Component, OnInit } from '@angular/core';
import { LibRegisterService } from '../lib-register.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  
  constructor(private reg: LibRegisterService) { }
  ngOnInit() { }

}
