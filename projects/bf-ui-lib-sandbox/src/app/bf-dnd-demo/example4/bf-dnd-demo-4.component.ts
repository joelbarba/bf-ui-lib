import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfDnDService} from '../../../../../bf-ui-lib/src/lib/bf-dnd/bf-dnd.service';

@Component({
  selector: 'app-bf-dnd-demo-4',
  templateUrl: './bf-dnd-demo-4.component.html',
  styleUrls: ['./bf-dnd-demo-4.component.scss']
})
export class BfDndDemo4Component implements OnInit, OnDestroy {
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
  public isDebugMode = false;
  public isAccurateMode = false;



  public viewCode = `<div class="col-3">
  <div class="board">
    <h4>List 1</h4>
    <div *ngFor="let item of list1">
      <div [bfDraggable]="item" bfDragMode="copy">{{item.name}}</div>
    </div>
  </div>
</div>

<div class="col-3">
  <div id="cont-1" [bfDropContainer]="container1">
    <h5>Container 1</h5>
    <div [bfDropPlaceholder]="{ pos: 0 }" bfDropContainerId="cont-1">Placeholder 0</div>
    <div [bfDropPlaceholder]="{ pos: 1 }" bfDropContainerId="cont-1">Placeholder 1</div>
    <div [bfDropPlaceholder]="{ pos: 2 }" bfDropContainerId="cont-1">Placeholder 2</div>
  </div>
</div>

<div class="col-6">
  <div id="cont-2" class="cont-2" [bfDropContainer]="container2">
    <h5>Container 2</h5>
    <div class="ph-1" [bfDropPlaceholder]="{pos:1}" bfDropContainerId="cont-2">Placeholder 1</div>
    <div class="ph-2" [bfDropPlaceholder]="{pos:2}" bfDropContainerId="cont-2">Placeholder 2</div>
    <div class="ph-3" [bfDropPlaceholder]="{pos:3}" bfDropContainerId="cont-2">Placeholder 3</div>
    <div class="ph-4" [bfDropPlaceholder]="{pos:4}" bfDropContainerId="cont-2">Placeholder 4</div>
    <div class="ph-5" [bfDropPlaceholder]="{pos:5}" bfDropContainerId="cont-2">Placeholder 5</div>
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
  z-index: 100;
  text-align: center;
  padding: 20px;
  &.dragging-over {
    background: rgba(darkseagreen, 0.2);
    border-color: greenyellow;
  }
}

.bf-drop-placeholder {
  background: lightblue;
  border: 2px dashed cornflowerblue;
  padding: 20px;
  margin: 15px 60px;
  &.active-placeholder {
    background: rgba(yellow, 0.5);
  }
}

.cont-2.bf-drop-container {
  position: relative;
  padding: 20px 0 0 0;
  .bf-drop-placeholder {
    margin: 0;
    padding: 0;
    @extend .flex-center;
    position: absolute;
    &.ph-1 { left: 10px;  top: 210px; width: 300px; height: 50px; }
    &.ph-2 { left: 320px; top: 50px;  width: 200px; height: 70px; }
    &.ph-3 { left: 525px; top: 50px;  width: 170px; height: 50px; }
    &.ph-4 { left: 500px; top: 260px; width: 200px; height: 70px; }
    &.ph-5 { left: 50px;  top: 310px; width: 185px; height: 60px; }
  }
}`;

  ctrlCode = `constructor(public bfDnD: BfDnDService) {  
  this.bfDnD.dragEndOk$.subscribe(params => {
    this.growl.success( 
      'Dropping into container ' + params.bfDropContainer.id
      + ' - placeholder: ' + params.bfDropPlaceholder.model.pos
    );
  }); 
}`;

  constructor(
    public router: Router,
    public growl: BfGrowlService,
    public bfDnD: BfDnDService,
  ) {}

  ngOnInit() {

    this.subs.add(this.bfDnD.dragEndOk$.subscribe(params => {
      // params.bfDropContainer.list.push(params.bfDraggable);
      // console.log('dropping ', params, this.bfDnD.activeContainer);
      this.growl.success('Dropping into container '
        + params.bfDropContainer.id
        + ' - placeholder: ' + params.bfDropPlaceholder.model.pos
        // + ' - Item: ' + params.bfDraggable.name
      );
    }));

    this.subs.add(this.bfDnD.activeContainer$.subscribe(cont => console.log('A container: ', cont)));
    this.subs.add(this.bfDnD.activePlaceholder$.subscribe(ph => console.log('Active placeholder: ', ph)));
    this.subs.add(this.bfDnD.dragOver$.subscribe(ph => console.log('Dragging over...')));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
