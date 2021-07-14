import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BfNoDataComponent } from './bf-no-data.component';
import { BfTranslatePipe } from '../abstract-translate.service';
import { TestingModule } from '../../testing/testing-module';

describe('BfNoDataComponent', () => {
  let component: BfNoDataComponent;
  let fixture: ComponentFixture<BfNoDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfNoDataComponent, BfTranslatePipe ],
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
