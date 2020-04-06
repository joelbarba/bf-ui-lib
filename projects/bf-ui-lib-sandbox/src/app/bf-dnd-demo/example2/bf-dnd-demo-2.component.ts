import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfDnDService} from '../../../../../bf-ui-lib/src/lib/bf-dnd/bf-dnd.service';

@Component({
  selector: 'app-bf-dnd-demo-2',
  templateUrl: './bf-dnd-demo-2.component.html',
  styleUrls: ['./bf-dnd-demo-2.component.scss']
})
export class BfDndDemo2Component implements OnInit, OnDestroy {
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
    <div [bfDraggable]="obj1">{{obj1.name}}</div>
    <div [bfDraggable]="obj2">{{obj2.name}}</div>
    <div [bfDraggable]="obj3">{{obj3.name}}</div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div [bfDropContainer]="container1" (bfDrop)="addItem($event)">
      <h4 class="padB30">List 1</h4>
      <div *ngFor="let item of container1.list" class="marT5">
        <bf-btn bfType="delete-icon" (bfClick)="container1.list.removeById(item.id)"></bf-btn>
        <span class="marL20" >{{item.id}}. {{item.name}}</span>
      </div>
    </div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div [bfDropContainer]="container2" (bfDrop)="addItem($event)">
      <h4 class="padB30">List 2</h4>
      <div *ngFor="let item of container2.list" class="marT5">
        <bf-btn bfType="delete-icon" (bfClick)="container2.list.removeById(item.id)"></bf-btn>
        <span class="marL20" >{{item.id}}. {{item.name}}</span>
      </div>
    </div>
  </div>
</div>`;

  scssCode = `.board {
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid black;
  padding: 30px;
  background: lightcyan;
  &.dragging-over { 
    background: darkseagreen; 
  }
}

.bf-draggable {
  width: 200px;
  height: 60px;
  border: 1px solid red;
  margin: 5px;
  background: orange;
  @extend .f-center;

  &:hover { cursor: grab; }
  &.is-dragging { opacity: 0.2; }
}

.bf-drop-container {
  width: 100%;
  height: 100%;
  background: lightgrey;
  &.dragging-over { 
    background: darkseagreen; 
  }
}`;

  ctrlCode = `public obj1 = { id: '1', name: 'Orange' };
public obj2 = { id: '2', name: 'Banana' };
public obj3 = { id: '3', name: 'Apple' };
public container1 = { id: '1', list: [] };
public container2 = { id: '2', list: [] };
  
constructor(public bfDnD: BfDnDService) {}

addItem(event) {
  const list = event.bfDropContainer.list;
  list.push({ ...event.bfDraggable, id: list.length });
}`;

  constructor(
    public router: Router,
    public growl: BfGrowlService,
    public bfDnD: BfDnDService,
  ) {}

  ngOnInit() { }

  addItem(event) {
    const list = event.bfDropContainer.list;
    list.push({ ...event.bfDraggable, id: list.length });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
