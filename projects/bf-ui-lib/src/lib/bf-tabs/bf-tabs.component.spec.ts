import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BfTab, BfTabsComponent } from './bf-tabs.component';

const keyPressEvent = (key) => {
  const event = new KeyboardEvent('keypress', { key });
  spyOn(event, 'preventDefault');
  return event;
};

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
      },
      {
        id: '2',
      },
      {
        id: '3'
      }
    ];
  });

  describe('selectTab()', () => {
    it('should set active on selected tab', () => {
      component.selectTab(component.bfTabs[1]);
      expect(component.bfTabs[1].active).toBe(true);
    });
  });

  describe('keyDown()', () => {
    beforeEach(() => {
      spyOn(component, 'selectTab');
      spyOn(component.tabElements, 'get').and.returnValue({nativeElement: {focus: () => {}}});
    });

    it('should do nothing if a left or right wasnt pressed', () => {
      component.keyDown(keyPressEvent('Not Relevant'), {} as BfTab);
      expect(component.selectTab).not.toHaveBeenCalled();
    });
    it('should focus on the next item if right arrow is pressed', () => {
      component.keyDown(keyPressEvent('ArrowRight'), {id: '1'} as BfTab);
      expect(component.selectTab).toHaveBeenCalledWith({id: '2'});
    });
    it('should focus on the first item if right arrow is pressed on the last item', () => {
      component.keyDown(keyPressEvent('ArrowRight'), {id: '3'} as BfTab);
      expect(component.selectTab).toHaveBeenCalledWith({id: '1'});
    });
    it('should focus on the previous item if left arrow is pressed', () => {
      component.keyDown(keyPressEvent('ArrowLeft'), {id: '3'} as BfTab);
      expect(component.selectTab).toHaveBeenCalledWith({id: '2'});
    });
    it('should focus on the last item if left arrow is pressed on the first item', () => {
      component.keyDown(keyPressEvent('ArrowLeft'), {id: '1'} as BfTab);
      expect(component.selectTab).toHaveBeenCalledWith({id: '3'});
    });
    it('should go to the first item if home is pressed', () => {
      component.keyDown(keyPressEvent('Home'), {id: '3'} as BfTab);
      expect(component.selectTab).toHaveBeenCalledWith({id: '1'});
    });
    it('should go to the last item if home is pressed', () => {
      component.keyDown(keyPressEvent('End'), {id: '1'} as BfTab);
      expect(component.selectTab).toHaveBeenCalledWith({id: '3'});
    });
  });

});
