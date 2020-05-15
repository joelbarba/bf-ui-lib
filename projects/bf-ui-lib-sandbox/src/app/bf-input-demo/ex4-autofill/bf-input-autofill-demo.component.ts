import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bf-input-autofill-demo',
  templateUrl: './bf-input-autofill-demo.component.html',
  styleUrls: ['./bf-input-autofill-demo.component.scss']
})
export class BfInputAutofillDemoComponent implements OnInit, AfterViewInit {

  constructor(
    public growl: BfGrowlService,
    public router: Router,
  ) {}

  public user;
  public pass;

  public isAutofilled = '';

  public example = `<form>
  <bf-input bfLabel="Username" name="user"
            [(ngModel)]="user"
            [bfRequired]="true"
            (bfOnAutofill)="doSomething()">
  </bf-input>
  <button type="submit" [routerLink]="'/xxxx'">Click me</button>
</form>`;



  ngOnInit() {}
  ngAfterViewInit() {}

  public doSomething = () => {
    this.isAutofilled = 'Value has been autofilled!';
    this.growl.success('The input has been autofilled with ');
  }

}



