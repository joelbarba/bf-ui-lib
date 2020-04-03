import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfDnDService} from '../../../../../bf-ui-lib/src/lib/bf-dnd/bf-dnd.service';

@Component({
  selector: 'app-bf-dnd-demo-5',
  templateUrl: './bf-dnd-demo-5.component.html',
  styleUrls: ['./bf-dnd-demo-5.component.scss']
})
export class BfDndDemo5Component implements OnInit, OnDestroy {
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

  public viewCode = `<div class="col-3">
  <div class="board">
    <h4 class="padB30">Draggable elements</h4>
    <div class="draggable" [bfDraggable]="{ id: 1, name: 'Orange' }">Orange</div>
    <div class="draggable" [bfDraggable]="{ id: 2, name: 'Banana' }">Banana</div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div class="container" bfDropContainer
         (bfDrop)="growl.success($event.bfDraggable.name + ' dropped')">
      <span>Drop here</span>
    </div>
  </div>
</div>`;

  scssCode = `.draggable {
  width: 200px;
  height: 60px;
  border: 1px solid red;
  margin: 5px;
  background: orange;
  @extend .f-center;
  &:hover { cursor: grab; }
  &.is-dragging { opacity: 0.2; }
}

.container {
  width: 100%;
  height: 100%;
  border: 4px dashed gray;
  border-radius: 10px;
  @extend .f-center;
  &.dragging-over {
    background: darkseagreen;
    border-color: greenyellow;
  }
}`;

  ctrlCode = `constructor(public bfDnD: BfDnDService) {}

ngOnInit() {

  this.bfDnD.dragEndOk$.subscribe(params => {
    // console.log('dropping ', params);
  });

  this.subs.add(this.bfDnD.dragEndKo$.subscribe(params => {
    this.growl.error('Ups, that fell out');
  });
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
      this.growl.error('Ups, that fell out');
    }));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
