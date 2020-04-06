import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BfDropPlaceholderDirective} from './bf-drop-placeholder.directive';

describe('BfDropPlaceholderDirective', () => {
  let component: BfDropPlaceholderDirective;
  let fixture: ComponentFixture<BfDropPlaceholderDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDropPlaceholderDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDropPlaceholderDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
