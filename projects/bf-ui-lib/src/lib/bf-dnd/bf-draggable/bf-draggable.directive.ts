import {
  ApplicationRef,
  Component,
  Directive,
  ElementRef, EmbeddedViewRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit, Renderer2
} from '@angular/core';
import {BfGrowlService} from '../../bf-growl/bf-growl.service';
import {BfDnDService} from '../bf-dnd.service';

// public readonly isFirefox = typeof InstallTrigger !== 'undefined';
// public readonly isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
const isSafari = window['safari'] !== undefined;


@Directive({
  selector: '[bfDraggable]'
})
export class BfDraggableDirective implements OnChanges {
  @Input() bfDraggable: {};
  @Input() bfDragMode = 'copy';

  @HostBinding('class.is-dragging') private isDragging = false;

  private halfWidth;  // Element's middle point
  private halfHeight;

  constructor(
    private el: ElementRef,
    public growl: BfGrowlService,
    public bfDnD: BfDnDService,
    // private renderer: Renderer2,
    // private appRef: ApplicationRef,
  ) {

    // this.el.nativeElement.addEventListener('touchstart', (event) => { console.log('touchstart'); });
    // this.el.nativeElement.addEventListener('touchmove', (event) => { console.log('touchmove'); });
    // this.el.nativeElement.addEventListener('touchend', (event) => { console.log('touchend'); });
    // this.el.nativeElement.addEventListener('touchcancel', (event) => { console.log('touchcancel'); });
  }

  ngOnChanges(changes) {
    this.el.nativeElement.draggable = true;
  }

  // When the drag starts
  @HostListener('dragstart', ['$event']) dragstart(event) {
    this.isDragging = true;
    this.bfDragMode = this.bfDragMode || 'copy';

    // The dragging data is stored in bfDraggable, but we still need to add a dataTransfer to make it work in Firefox
    // The correct mime type should be 'application/x-dnd', but Microsoft Edge and IE only support 'application/json' / 'Text'
    // https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
    if (event.type !== 'touchmove') { event.dataTransfer.setData('Text', ''); }

    // Creates a div to wrap a copy of the selected element, and float it along the dragging
    let ghost = document.getElementById('bf-drag-ghost-id');
    if (!!ghost) { ghost.remove(); }
    ghost = document.createElement('div');
    ghost.setAttribute('id', 'bf-drag-ghost-id');
    ghost.setAttribute('class', 'bf-drag-ghost');
    ghost.appendChild(this.el.nativeElement.cloneNode(true));
    document.body.appendChild(ghost);
    ghost.style.position = 'fixed';
    ghost.style.top = '-2500px';
    ghost.style.left = '-2500px';

    const params = { event, element: this.el, bfDraggable: this.bfDraggable, bfDragMode: this.bfDragMode };

    if (!isSafari) { // No Safari browsers (the setDragImage needs to be done in the same cycle)
      this.setDragImage(event, ghost);

      setTimeout(() => { // Firefox needs to wait till ghost is rendered in the dom
        if (event.type !== 'touchmove') { ghost.style.display = 'none'; }
        // ghost.style.display = 'block'; ghost.style.top = '100px'; ghost.style.left = '100px'; // <---- DEBUG
        this.bfDnD.startDrag(this.el, this.bfDraggable, this.bfDragMode);
      });

    } else { // Safari is super picky and needs to have the element rendered before we use setDragImage()
      setTimeout(() => {
        this.setDragImage(event, ghost);
        if (event.type !== 'touchmove') { ghost.style.display = 'none'; }
        this.bfDnD.startDrag(this.el, this.bfDraggable, this.bfDragMode);
      }, 20);
    }



    event.stopPropagation();
  }

  private setDragImage = (event, ghost) => {
    const renderedShadowRect = document.getElementById('bf-drag-ghost-id').getBoundingClientRect();
    this.halfWidth = renderedShadowRect.width / 2;
    this.halfHeight = renderedShadowRect.height / 2;
    if (event.type !== 'touchmove') {
      event.dataTransfer.setDragImage(ghost, this.halfWidth, this.halfHeight);
    }
  };

  // When dropping
  @HostListener('dragend', ['$event']) dragend(event) {
    this.isDragging = false;
    this.bfDnD.dragEnd();
    const ghost = document.getElementById('bf-drag-ghost-id');
    if (!!ghost) { ghost.remove(); }
    // if (isDebugMode) { debugRenderPannel(event, BfDnD); }
  }

  // Workaround to make element draggable in IE9
  @HostListener('selectstart') selectstart() {
    if (this.el.nativeElement.dragDrop) { this.el.nativeElement.dragDrop(); }
  }



  // ------------------------------ Touch Screen Support ----------------------------------
  // Drag and drop for touch screens works differently (it is actually not recommended)



  // When the touch starts
  @HostListener('touchstart') touchstart() {
    this.bfDnD.disableScroll(); // You cannot drag and scroll touching at the same time. Disable scroll
  }

  // When the touch moves
  @HostListener('touchmove', ['$event']) touchmove(event) {
    if (!this.isDragging) {
      this.dragstart(event);

    } else { // Dragging on touch does not work natively, so the ghost element should be moved manually
      const clientX = this.getCoord('clientX', event);
      const clientY = this.getCoord('clientY', event);
      const ghost = document.getElementById('bf-drag-ghost-id');
      if (ghost) {
        ghost.style.left = (clientX - this.halfWidth) + 'px';
        ghost.style.top = (clientY - this.halfHeight) + 'px';
      }
    }
  }

  // When the touch dragging ends by dropping
  @HostListener('touchend', ['$event']) touchend(event) {
    this.dragend(event);
    this.bfDnD.enableScroll();
  }

  // When the touch dragging ends by something unexpected
  @HostListener('touchcancel', ['$event']) touchcancel(event) {
    this.dragend(event);
    this.bfDnD.enableScroll();
  }

  // Get the coordinates (this is how dragula does it)
  private getCoord = (coord, event) => {
    let host = event;

    // on touchend event, we have to use `e.changedTouches`
    if (event.targetTouches && event.targetTouches.length) { host = event.targetTouches[0]; }
    if (event.changedTouches && event.changedTouches.length) { host = event.changedTouches[0]; }

    const missMap = { pageX: 'clientX', pageY: 'clientY' }; // IE8
    if (coord in missMap && !(coord in host) && missMap[coord] in host) {
      coord = missMap[coord];
    }
    return host[coord];
  }

}
