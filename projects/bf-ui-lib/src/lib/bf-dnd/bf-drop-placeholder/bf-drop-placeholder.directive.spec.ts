import {ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, NgModule} from '@angular/core';
import {BfDnDModule} from '../bf-dnd.module';
import {TestingModule} from '../../../testing/testing-module';
import {BfDnDService} from '../bf-dnd.service';


@Component({ template: `<div [bfDropContainer]="1" id="cont-1">
    <div [bfDropPlaceholder]="{ id: 1 }" bfDropContainerId="cont-1"></div>
  </div>`,
})
class HostComponent {}
@NgModule({
  imports: [BfDnDModule],
  declarations: [HostComponent],
  exports: [HostComponent],
})
class HostModule {}


describe('BfDropPlaceholderDirective', () => {
  let bfDnD: BfDnDService;
  let component: HostComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HostModule],
      providers: [BfDnDService]
    }).compileComponents();

    bfDnD = TestBed.inject(BfDnDService); // * inject service instance

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges(); // * so the directive gets applied

  });

  it('should create a host instance', () => {
    expect(component).toBeTruthy();
  });
});
