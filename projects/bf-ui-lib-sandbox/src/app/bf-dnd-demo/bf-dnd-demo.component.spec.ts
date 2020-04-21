import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BfDndDemoComponent} from './bf-dnd-demo.component';

describe('BfDropPlaceholderDemoComponent', () => {
  let component: BfDndDemoComponent;
  let fixture: ComponentFixture<BfDndDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDndDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDndDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
