import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector, OnDestroy,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfDnDService} from '../../../../bf-ui-lib/src/lib/bf-dnd/bf-dnd.service';
import {SubSink} from 'subsink';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bf-drop-placeholder-demo',
  templateUrl: './bf-dnd-demo.component.html',
  styleUrls: ['./bf-dnd-demo.component.scss']
})
export class BfDndDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs = new SubSink();
  public name = BfDndDemoDoc.name;
  public desc = BfDndDemoDoc.desc;
  public api = BfDndDemoDoc.api;
  public instance = BfDndDemoDoc.instance;
  public cssReset = ``;

  public obj1 = { id: '1', name: 'Orange' };
  public obj2 = { id: '2', name: 'Banana' };
  public obj3 = { id: '3', name: 'Apple' };
  public list1 = [this.obj1, this.obj2, this.obj3];
  public list2 = [];
  public container1 = { id: '1', list: [] };
  public container2 = { id: '2', list: [] };
  public container3 = { id: '3', list: [] };
  public container4 = { id: '4', list: [] };
  public isDebugMode = false;
  public isAccurateMode = false;

  code1 = ` <h4 [bfDraggable]="{ name: 'Orange' }" bfDragMode="move">Orange</h4>`;
  code2 = `<div id="bf-drag-ghost-id" class="bf-drag-ghost"> ... </div>`;
  code3 = `<div [bfDropContainer]="myList" (bfDrop)="growl.success($event.bfDraggable.name)"></div>`;
  code4 = `this.bfDnD.dragEndOk$.subscribe(params => {
  params.bfDropContainer.list.push(params.bfDraggable);
});`;
  code5 = `<div [bfDropPlaceholder]="{ pos: 1 }" bfDropContainerId="container-1">
  <h6>Placeholder 1</h6>
</div>`;
  code6 = `placeholder.distance = ((event.clientX - placeholder.midX) * (event.clientX - placeholder.midX)
                      + (event.clientY - placeholder.midY) * (event.clientY - placeholder.midY));`;

  constructor(
    public router: Router,
    public growl: BfGrowlService,
    private injector: Injector,
    private r: ComponentFactoryResolver,
    public bfDnD: BfDnDService,
  ) {
    // const factory = this.r.resolveComponentFactory(BfNoDataComponent);
    // const compRef = factory.create(injector);
    // const view = compRef.hostView;
    // // this.vc2.createComponent(factory);

  }

  ngOnInit() {

    this.subs.add(this.bfDnD.dragEndOk$.subscribe(params => {
      let msg = 'Dropping "' + params.bfDraggable.name + '" into container ' + params.bfDropContainer.id;
      if (params.bfDropPlaceholder) {
        msg += ' <br> placeholder ' + params.bfDropPlaceholder.model.pos;
      }
      this.growl.success(msg);
    }));

    this.subs.add(this.bfDnD.dragEndKo$.subscribe(params => this.growl.error('Ups, that fell out')));
  }

  moveTo1(item) {
    this.list1.push(item);
    this.list2.removeByProp('name', item.name);
  }

  changeNestedOp = (val) => {
    this.bfDnD.bfNestedContainers = !!val;
    this.growl.success('BfDnD Nested detection ' + (val ? 'On' : 'Off'));
  };


  onDragOver(event) {
    // event.stopPropagation();
    event.preventDefault();
  }

  ngAfterViewInit() {

    // const view1 = this.myTemplate.createEmbeddedView(null);
    // const view2 = this.myTemplate.createEmbeddedView(null);
    // this.vc1.insert(view1);
    // this.vc2.insert(view2);
    // this.vc2.createEmbeddedView(this.myTemplate);
  }
  ngOnDestroy() { this.subs.unsubscribe(); }

  public changeDebugMode = (value) => {
    this.bfDnD.setDebugMode(value);
  }
}


export const BfDndDemoDoc = {
  name    : `BfDnD`,
  uiType  : 'module',
  desc    : `Drag and drop module`,
  api     : `BfDnDService + [bfDraggable] + [bfDropContainer] + [bfDropPlaceholder]`,
  instance: `BfDnDService`,
  demoComp: BfDndDemoComponent
};
