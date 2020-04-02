import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BfDnDService {
  public isDragging = false;       // Whether there is a dragging operation ongoing
  public bfDraggable = null;       // Model attach to the dragging element
  public bfDragMode = null;        // Current dragging mode (copy / move)

  // // Callback functions
  public change$ = new Subject();   // Event source (all triggers go through this guy)
  public dragStart$;                // When a drag operation starts
  public dragEndOk$;                // When a drag operation finishes successfully (drop into valid container)
  public dragEndKo$;                // When a drag operation finishes unsuccessfully (drop out of any container)

  public containers = [];              // List of the registered containers (<bf-drop-container>)
  public placeholders = [];            // List of the registered placeholders (<bf-drop-placeholder>)
                                       // id, element, model, containerId
  public activePlaceholder = null;     // Reference to the active (closest) placeholder in placeholders[]
  public activeContainer = null;       // Reference to the active (dragging over) container in containers[]

  public touchDragOver$ = new Subject();   // This is for containers to know when dragging over (when touchmove)

  // Internals
  private isDropping = false;           // To know whether the drop occurs into a valid container (true) or not (false)
  private currentDropContainer = null;  // Model attach to the current dropping container

  constructor() {
    // Shortcuts
    this.dragStart$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragStart'), map(ev => ev.params));
    this.dragEndOk$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragEndOk'), map(ev => ev.params));
    this.dragEndKo$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragEndKo'), map(ev => ev.params));


    // Detect when dragging over for touch screens (there's no event on the element, it has to be positional)
    document.addEventListener('touchmove', (event) => {
      if (this.isDragging) {
        const ghost = event.touches[0];
        for (const cont of this.containers) {
          const contRect = cont.element.getBoundingClientRect();
          if (ghost.pageX >= contRect.left && ghost.pageX <= contRect.right && ghost.pageY >= contRect.top && ghost.pageY <= contRect.bottom) {
            this.touchDragOver$.next(cont);
          }
        }
      }
    });


    this.change$.subscribe((ev: any) => {
      console.log('bfDnD - ', ev.eventName);
    });
  }

  // This happens when you start dragging a <div [bfDraggable]> element
  public startDrag = (element, bfDraggable, bfDragMode) => {
    this.isDropping = false;
    this.isDragging = true;
    this.bfDraggable = bfDraggable;
    this.bfDragMode = bfDragMode;
    this.activePlaceholder = null;
    this.change$.next({ eventName: 'onDragStart', params: { element, bfDraggable, bfDragMode } });
  };

  // This happens when you drop a dragging element into a <div [bfDropContainer]>
  public dropInto = ($event, $element, bfDropContainer) => {
    if (this.isDragging) {
      this.isDropping = true;
      this.currentDropContainer = bfDropContainer;
    }
  };

  // This happens when you stop dragging an element. I can be dropped into a container or out
  public dragEnd = () => {
    const ghost = document.getElementById('bf-drag-ghost-id');
    // if (!!ghost) { ghost.remove(); }

    if (this.isDropping) { // That means the drop was into a container
      this.change$.next({ eventName: 'onDragEndOk', params: {
          bfDraggable        : this.bfDraggable,
          bfDropContainer    : this.currentDropContainer,
          activePlaceholder  : this.activePlaceholder
      }});

    } else {
      this.change$.next({ eventName: 'onDragEndKo', params: { bfDraggable: this.bfDraggable }});
    }

    this.isDropping = false;
    this.isDragging = false;
    this.activePlaceholder = null;
    this.bfDragMode = null;
  };


}
