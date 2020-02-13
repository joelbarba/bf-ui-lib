import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListHeaderColComponent } from './bf-list-header-col.component';
import { TestingModule } from '../../testing/testing-module';

describe('BfListHeaderColComponent', () => {
  let component: BfListHeaderColComponent;
  let fixture: ComponentFixture<BfListHeaderColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListHeaderColComponent ],
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListHeaderColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
