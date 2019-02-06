import { Component, OnInit } from '@angular/core';
import { LibRegisterService } from './lib-register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private reg: LibRegisterService) {}
  ngOnInit() {
  }

}
