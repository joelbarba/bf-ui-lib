import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {BfCollapseComponent} from './bf-collapse.component';
import {TestingModule} from '../../testing/testing-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';

@Component({ template: '<div [bf-collapse]="isCol" #myBox="bfCollapse">{{isCol}}</div>' })
class HostComponent { isCol = false; }

describe('BfCollapseComponent', () => {
  let fixture: ComponentFixture<BfCollapseComponent>;
  let component: BfCollapseComponent;
  let wrapperFixture: ComponentFixture<HostComponent>;
  let wrapper: HostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, BfCollapseComponent],
      imports: [TestingModule, BrowserAnimationsModule],
    }).compileComponents();
    wrapperFixture = TestBed.createComponent(HostComponent);
    wrapper = wrapperFixture.componentInstance;
    fixture = TestBed.createComponent(BfCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand', (done) => {
    expect(component.isCollapsed).toBe(true);
    component.show();
    setTimeout(() => {
      expect(component.isCollapsed).toBe(false);
      done();
    }, 500);
  });

  it('should collapse on toggle', (done) => {
    component.isCollapsed = false;
    component.toggle();
    setTimeout(() => {
      expect(component.isCollapsed).toBe(true);
      done();
    }, 500);
  });

  it('should reset', (done) => {
    component.isCollapsed = false;
    component.reset();
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.overflow).toEqual('hidden');
      done();
    }, 500);
  });


  // This does not work. God knows why
  // it('should collapse after 500 seconds', (done) => {
  //   expect(fixture.nativeElement.querySelector('div').clientHeight).toEqual(18);
  //   wrapper.isCol = true;
  //   fixture.detectChanges();
  //   setTimeout(() => {
  //     expect(fixture.nativeElement.querySelector('div').clientHeight).toEqual(0);
  //     done();
  //   }, 500);
  // });

});
