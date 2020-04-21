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
  public myList = [
    { id: '1',  pos: 0, name: 'Orange' },
    { id: '2',  pos: 1, name: 'Banana' },
    { id: '3',  pos: 2, name: 'Apple' },
    { id: '4',  pos: 3, name: 'Berries' },
    { id: '5',  pos: 4, name: 'Pear' },
    { id: '6',  pos: 5, name: 'Melon' },
    { id: '7',  pos: 6, name: 'Cherry' },
    { id: '8',  pos: 7, name: 'Grapes' },
    { id: '9',  pos: 8, name: 'Peach' },
    { id: '10', pos: 9, name: 'Lemon' },
  ];
  public heightAnimation = false;
  public dropAnimation = true;
  public isDroppingId;

  public viewCode = `<div id="list-cont" bfDropContainer (bfDrop)="reorderList($event)">

  <!--Unique first placeholder to drop at position 0-->
  <div id="pos-0" [bfDropPlaceholder]="{ pos: -1 }" bfDropContainerId="list-cont">
    <span class="marL20">{{'myList[' + bfDnD.bfDraggable?.pos + ']'}}</span>
    <span class="marL30">{{bfDnD.bfDraggable?.id + '. ' + bfDnD.bfDraggable?.name}}</span>
  </div>

  <div *ngFor="let item of myList">

    <!--Row Item-->
    <div class="list-draggable" [bfDraggable]="item" [class.is-dropping]="item.id === isDroppingId">
      <span class="icon-more2 marR5"></span>
      <span>{{'myList[' + item.pos + ']'}}</span>
      <span class="marL30">{{item.id + '. ' + item.name}}</span>
    </div>

    <!--Placeholder below every item (except the dragging one)-->
    <div [id]="'pos-' + item.id" *ngIf="bfDnD.bfDraggable?.id !== item.id"
         [bfDropPlaceholder]="item" bfDropContainerId="list-cont">
      <span class="marL20">{{'myList[' + bfDnD.bfDraggable?.pos + ']'}}</span>
      <span class="marL30">{{bfDnD.bfDraggable?.id + '. ' + bfDnD.bfDraggable?.name}}</span>
    </div>

  </div>
</div>`;

  scssCode1 = `
.bf-drop-container {
  width: 100%; height: 450px;
  padding: 25px 15px;

  .bf-draggable {
    border: 1px solid gray;
    padding: 0 15px;
    background: lightgrey;
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    cursor: grab;
    &.is-dragging { opacity: 0.5; }
  }

  .bf-drop-placeholder {
    @extend .bf-draggable;
    border: 1px dashed gray;
    &.active-placeholder {
      height: 40px;
      opacity: 0.5;
      background: greenyellow;
    }
    &:not(.active-placeholder) {
      height: 0;
      border: none;
    }
  }

  &.dragging-over {
    border-color: greenyellow;
    .bf-draggable.is-dragging {
      opacity: 0;
      height: 0;
      border: none;
    }
  }
}`;

  scssCode2 = `
// Drag option icon
.bf-draggable .icon-more2 { opacity: 0; }
.bf-drop-container:not(.dragging-over) {
  .bf-draggable:hover .icon-more2 { opacity: 0.5; }
}

// Animation on expanding placeholders
.bf-drop-container.dragging-over .bf-drop-placeholder {
  transition-property: height;
  transition-duration: 0.15s;
}

// Animation on dropping elements
.bf-draggable.is-dropping {
  animation: 0.2s ease-in my-drop-ani;
  @keyframes my-drop-ani {
    0% { background: darken(greenyellow, 10%); }
    20% { background: greenyellow; }
    100% { background: lightgrey; }
  }
}

// --------- Non encapsulated styles ------
.bf-drag-ghost .bf-draggable.list-draggable {
  opacity: 0.6;
  background: gray !important;
  width: 200px;
  height: 40px;
  padding: 10px 15px;
  transform: rotate(-3deg);
}`;

  ctrlCode = `public myList = [
  { id: '1',  pos: 0, name: 'Orange' },
  { id: '2',  pos: 1, name: 'Banana' },
  { id: '3',  pos: 2, name: 'Apple' },
  { id: '4',  pos: 3, name: 'Berries' },
  { id: '5',  pos: 4, name: 'Pear' },
  { id: '6',  pos: 5, name: 'Melon' },
  { id: '7',  pos: 6, name: 'Cherry' },
  { id: '8',  pos: 7, name: 'Grapes' },
  { id: '9',  pos: 8, name: 'Peach' },
  { id: '10', pos: 9, name: 'Lemon' },
];  
  
constructor(public bfDnD: BfDnDService) {}

// Reorder on drop
reorderList(event) {
  const dragItem = event.bfDraggable;
  const placeAfter = event.bfDropPlaceholder.model;

  // Calculate new position in the array
  let newPos = placeAfter.pos;
  if (newPos < dragItem.pos) { newPos++; }

  this.myList.removeById(dragItem.id); // Remove it from original position
  this.myList.splice(newPos, 0, dragItem); // Inject it after placeholder
  this.myList.forEach((item, ind) => item.pos = ind); // Reorder list

  // This is to trigger an animation when dropping
  this.isDroppingId = dragItem.id;
  setTimeout(() => this.isDroppingId = null, 1000);
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

    // this.subs.add(this.bfDnD.dragEndKo$.subscribe(params => {
    //   this.growl.error('Ups, that fell out');
    // }));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }


  resetArray() {
    this.myList = this.myList.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id));
    this.myList.forEach((item, ind) => item.pos = ind);
    this.growl.success('Array list has been reset');
  }

  reorderList(event) {
    const dragItem = event.bfDraggable;
    const placeAfter = event.bfDropPlaceholder.model;

    console.log('Move item:', dragItem, ' and place it after: ', placeAfter);

    // Calculate new position in the array
    let newPos = placeAfter.pos;
    const oldPos = dragItem.pos;
    if (newPos < oldPos) { newPos++; }
    this.growl.success(`Item "${dragItem.name}" reordered <br> from myList[${oldPos}] --- to ---> myList[${newPos}]`);

    this.myList.removeById(dragItem.id); // Remove it from original position
    this.myList.splice(newPos, 0, dragItem); // Inject it after the placeholder item
    this.myList.forEach((item, ind) => item.pos = ind); // Reorder all items of the list

    // This is to trigger an animation when dropping
    this.isDroppingId = dragItem.id;
    setTimeout(() => this.isDroppingId = null, 1000);
  }

}
