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


  // Internals
  private isDropping = false;           // To know whether the drop occurs into a valid container (true) or not (false)
  private currentDropContainer = null;  // Model attach to the current dropping container
  private fixScrolls = [];

  constructor() {
    // Shortcuts
    this.dragStart$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragStart'), map(ev => ev.params));
    this.dragEndOk$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragEndOk'), map(ev => ev.params));
    this.dragEndKo$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragEndKo'), map(ev => ev.params));


    // Listen to this event globally, so we can detect when a dragging moves over a container and mock the dragover
    document.addEventListener('touchmove', this.onTouchMove);

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



  // ------------------------------ Touch Screen Support ----------------------------------
  // Dragging on touch screen is quite tricky.
  // It is used to move scrolls, so we need to detect and freeze all scrollable elements when you
  // are dragging an element, and prevent both actions at the same time

  private getElementsWithScrolls = () => {
    const getComputedStyle = document.body && document.body['currentStyle'] ?
      (elem) => elem['currentStyle'] :
      (elem) => document.defaultView.getComputedStyle(elem, null);

    const getActualCss = (elem, style) => getComputedStyle(elem)[style];
    const autoOrScroll = (text) => (text === 'scroll' || text === 'auto');
    const isXScrollable = (elem) => elem.offsetWidth < elem.scrollWidth && autoOrScroll(getActualCss(elem, 'overflow-x'));
    const isYScrollable = (elem) => elem.offsetHeight < elem.scrollHeight && autoOrScroll(getActualCss(elem, 'overflow-y'));
    const hasScroller = (elem) => (isYScrollable(elem) || isXScrollable(elem));
    return [].filter.call(document.querySelectorAll('*'), hasScroller);
  };

  // Find all elements in the body with scroll, and freeze them (keep reference to unfreeze later)
  public disableScroll = () => {
    this.fixScrolls = [];
    const addRef = (ref, posX, posY) => {
      ref.onscroll = () => { ref.scrollTo(posX, posY); };
      if (ref.style) {
        ref.oriOverflow = ref.style.overflow;
        ref.style.overflow = 'hidden';
      }
      this.fixScrolls.push(ref);
    };

    // Freeze window scroll first
    document.body.style.overflow = 'hidden';
    addRef(window, window.pageXOffset || document.documentElement.scrollLeft,
                   window.pageYOffset || document.documentElement.scrollTop);

    const scrollEls = this.getElementsWithScrolls();
    if (scrollEls) { scrollEls.forEach(el => { addRef(el, el.scrollLeft, el.scrollTop); }); }
  };

  // Unfreeze frozen scrolls
  public enableScroll = () => {
    document.body.style.overflow = 'auto';
    this.fixScrolls.forEach(ref => {
      ref.onscroll = () => {};
      if (ref.style) { ref.style.overflow = ref.oriOverflow || null; }
    });
  };


  private onTouchMove = (event) => {
    if (this.isDragging) {
      const ghost = event.touches[0];
      const mockEvent = event;
      mockEvent.preventDefault = () => {};

      for (const cont of this.containers) {
        const contRect = cont.element.getBoundingClientRect();

        // Check if moving within the container rectangle area
        if (ghost.clientX >= contRect.left && ghost.clientX <= contRect.right && ghost.clientY >= contRect.top && ghost.clientY <= contRect.bottom) {
          if (cont.dragStatus === 0) { cont.onDragEnter(mockEvent); } // Mock drag enter
          cont.onDragOver(mockEvent); // Dragging over the container area

        } else { // If no dragging over anymore, mock drag leave
          if (cont.dragStatus === 1) { cont.onDragLeave(mockEvent); }
        }
      }
    }
  };




}
