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
    { id: '1',  order: 0, name: 'Orange' },
    { id: '2',  order: 1, name: 'Banana' },
    { id: '3',  order: 2, name: 'Apple' },
    { id: '4',  order: 3, name: 'Berries' },
    { id: '5',  order: 4, name: 'Pear' },
    { id: '6',  order: 5, name: 'Melon' },
    { id: '7',  order: 6, name: 'Cherry' },
    { id: '8',  order: 7, name: 'Grapes' },
    { id: '9',  order: 8, name: 'Peach' },
    { id: '10', order: 9, name: 'Lemon' },
  ];

  public viewCode = ``;

  scssCode = `a
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  d
  `;

  ctrlCode = `constructor(public bfDnD: BfDnDService) {}`;

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

}
