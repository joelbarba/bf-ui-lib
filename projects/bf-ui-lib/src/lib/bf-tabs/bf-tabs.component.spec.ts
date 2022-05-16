import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfTabsComponent } from './bf-tabs.component';

describe('BfTabsComponent', () => {
  let component: BfTabsComponent;
  let fixture: ComponentFixture<BfTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.bfTabs = [
      {
        id: '1',
        active: true
      },
      {
        id: '2',
      }
    ];
  });

  describe('selectTab()', () => {
    it('should set active on selected tab', () => {
      component.selectTab(component.bfTabs[1]);
      expect(component.bfTabs[1].active).toBe(true);
    });
  });

});
