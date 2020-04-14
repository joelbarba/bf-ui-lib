import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfDnDService} from '../../../../../bf-ui-lib/src/lib/bf-dnd/bf-dnd.service';

@Component({
  selector: 'app-bf-dnd-demo-1',
  templateUrl: './bf-dnd-demo-1.component.html',
  styleUrls: ['./bf-dnd-demo-1.component.scss']
})
export class BfDndDemo1Component implements OnInit, OnDestroy {
  private subs = new SubSink();
  public obj1 = { id: '1', name: 'Orange' };
  public obj2 = { id: '2', name: 'Banana' };
  public obj3 = { id: '3', name: 'Apple' };
  public list1 = [this.obj1, this.obj2, this.obj3];
  public list2 = [];
  public container1 = { id: '1', list: [] };
  public container2 = { id: '2', list: [] };
  public container3 = { id: '3', list: [] };
  public container4 = { id: '4', list: [] };
  public lastOp = '';

  public viewCode = `<div class="col-3">
  <div class="board">
    <h4 class="padB30">Draggable elements</h4>
    <div [bfDraggable]="{ id: 1, name: 'Orange' }">Orange</div>
    <div [bfDraggable]="{ id: 2, name: 'Banana' }">Banana</div>
    <div [bfDraggable]="{ id: 3, name: 'Apple' }">Apple</div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div bfDropContainer (bfDrop)="growl.success($event.bfDraggable.name)">
       Drop here
    </div>
  </div>
</div>`;

  scssCode = `.bf-draggable {
  width: 200px;
  height: 60px;
  border: 1px solid red;
  margin: 5px;
  background: orange;
  @extend .flex-center;
  &:hover { cursor: grab; }
  &.is-dragging { opacity: 0.2; }
}

.bf-drop-container {
  width: 100%;
  height: 100%;
  border: 4px dashed gray;
  border-radius: 10px;
  @extend .flex-center;
  &.dragging-over {
    background: darkseagreen;
    border-color: greenyellow;
  }
}`;

  ctrlCode = `constructor(public bfDnD: BfDnDService) {}

ngOnInit() {

  this.bfDnD.dragStart$.subscribe(drag => console.log('drag start'));

  this.bfDnD.dragEndOk$.subscribe(bfDropContainer => {
    this.growl.success('Dropping into container');
  });

  this.bfDnD.dragEndKo$.subscribe(params => {
    this.growl.error('Ups, that fell out');
  });


  this.bfDnD.activeContainer$.subscribe(cont => console.log('Container: ', cont));
  this.bfDnD.activePlaceholder$.subscribe(ph => console.log('Placeholder: ', ph));
  this.bfDnD.dragOver$.subscribe(cont => console.log('Dragging over...'));  
}`;

  constructor(
    public router: Router,
    public growl: BfGrowlService,
    public bfDnD: BfDnDService,
  ) {}

  ngOnInit() {

    // this.subs.add(this.bfDnD.dragEndOk$.subscribe(params => {
    //   console.log('dropping ', params, this.bfDnD.activeContainer);
    //   this.growl.success('Dropping into container ' + params.bfDropContainer.id + ' - Item: ' + params.bfDraggable.name);
    //   // this.list2.push(params.bfDraggable);
    //   // this.list1.removeByProp('name', params.bfDraggable.name);
    // }));


    this.subs.add(this.bfDnD.dragEndKo$.subscribe(params => {
      this.lastOp = 'Ups, that fell out';
      this.growl.error(this.lastOp);
    }));

    // this.subs.add(this.bfDnD.dragStart$.subscribe(params => console.log('drag start')));
    // this.subs.add(this.bfDnD.dragEndOk$.subscribe(params => console.log('drop in')));
    // this.subs.add(this.bfDnD.dragEndKo$.subscribe(params => console.log('drop out')));
    // this.subs.add(this.bfDnD.activeContainer$.subscribe(cont => console.log('Container: ', cont)));
    // this.subs.add(this.bfDnD.activePlaceholder$.subscribe(ph => console.log('Placeholder: ', ph)));
    // this.subs.add(this.bfDnD.dragOver$.subscribe(cont => console.log('Dragging over...')));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
