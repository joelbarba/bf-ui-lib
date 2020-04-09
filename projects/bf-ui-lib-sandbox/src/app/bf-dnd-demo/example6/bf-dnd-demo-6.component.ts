import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfDnDService} from '../../../../../bf-ui-lib/src/lib/bf-dnd/bf-dnd.service';

@Component({
  selector: 'app-bf-dnd-demo-6',
  templateUrl: './bf-dnd-demo-6.component.html',
  styleUrls: ['./bf-dnd-demo-6.component.scss']
})
export class BfDndDemo6Component implements OnInit, OnDestroy {
  private subs = new SubSink();
  public obj1 = { id: '1', name: 'Orange' };
  public obj2 = { id: '2', name: 'Banana' };
  public obj3 = { id: '3', name: 'Apple' };
  public obj4 = { id: '4', name: 'Lemon' };
  public container1 = { id: '1', list: [] };
  public container2 = { id: '2', list: [] };

  viewCode = `<div class="col-3">
  <h4 class="padB30">Group 1</h4>
  <div bfDragGroup="group-1" [bfDraggable]="obj1">{{obj1.name}}</div>
  <div bfDragGroup="group-1" [bfDraggable]="obj2">{{obj2.name}}</div>
</div>
<div class="col-3">
  <div bfDropContainer bfDragGroup="group-1" 
       (bfDrop)="growl.success($event.bfDraggable.name + ' dropped')">
    <h6>Drop container 1</h6>
  </div>
</div>


<div class="col-3">
  <div bfDropContainer bfDragGroup="group-2"
       (bfDrop)="growl.success($event.bfDraggable.name + ' dropped')">
    <h6>Drop container 2</h6>
  </div>
</div>
<div class="col-3">
  <h4 class="padB30">Group 2</h4>
  <div bfDragGroup="group-2" [bfDraggable]="obj3">{{obj3.name}}</div>
  <div bfDragGroup="group-2" [bfDraggable]="obj4">{{obj4.name}}</div>
</div>`;


  scssCode = `.bf-draggable {
  width: 200px;
  height: 60px;
  cursor: grab;
  border: 1px solid red;
  background: orange;
  @extend .flex-center;
  &.group-2 {
    border: 1px solid #2196F3;
    background: lightseagreen;
  }
  &.is-dragging { opacity: 0.2; }
}

.bf-drop-container {
  width: 100%;
  height: 100%;
  border: 4px dashed gray;
  border-radius: 10px;
  @extend .flex-center;
  &.group-2 { border: 4px dashed royalblue; }

  &.dragging-over {
    background: darkseagreen;
    border-color: greenyellow;
  }
}`;

  ctrlCode = ``;

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
