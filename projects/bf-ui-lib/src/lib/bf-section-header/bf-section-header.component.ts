import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BfUILibTransService } from '../../public_api';

@Component({
  selector: 'bf-section-header',
  templateUrl: './bf-section-header.component.html'
})
export class BfSectionHeaderComponent implements OnInit, OnChanges {
  @Input() bfTitle: string;
  @Input() bfDescription: string = null;

  public bfCurrentTitle$: Observable<string> = of('');
  public bfCurrentDescription$: Observable<string> = of('');

  constructor(private translate: BfUILibTransService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setLabel();
  }

  setLabel = () => {
    if (this.bfTitle) {
      this.bfCurrentTitle$ = this.translate.getLabel$(this.bfTitle);
    }

    if (this.bfDescription) {
      this.bfCurrentDescription$ = this.translate.getLabel$(this.bfDescription);
    }
  }

}
