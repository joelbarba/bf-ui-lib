import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2
} from '@angular/core';
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
  @Input() bfDragGroup;

  @HostBinding('class.bf-draggable') elementClass = true;
  @HostBinding('class.is-dragging') private isDragging = false;

  constructor(
    private el: ElementRef,
    private bfDnD: BfDnDService,
    private renderer: Renderer2,
    // private appRef: ApplicationRef,
  ) {

  }

  ngOnChanges(changes) {
    const isDraggable = this.bfDragMode === 'disabled' ? 'false' : 'true';
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', isDraggable);

    // Add a css class with the bfDragGroup value
    if (changes.hasOwnProperty('bfDragGroup')) {
      if (this.bfDragGroup) {
        this.renderer.addClass(this.el.nativeElement, this.bfDragGroup);
      } else if (changes.bfDragGroup.previousValue) {
        this.renderer.removeClass(this.el.nativeElement, changes.bfDragGroup.previousValue);
      }
    }
  }

  // When the drag starts
  @HostListener('dragstart', ['$event']) dragstart(event) {
    // console.log('[bfDraggable] --> dragstart');
    event.stopPropagation();
    this.isDragging = true;
    this.bfDnD.draggingGroup = this.bfDragGroup;
    this.bfDragMode = this.bfDragMode || 'copy';

    // The dragging data is stored in bfDraggable, but we still need to add a dataTransfer to make it work in Firefox
    // The correct mime type should be 'application/x-dnd', but Microsoft Edge and IE only support 'application/json' / 'Text'
    // https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
    if (event.type !== 'touchmove') { event.dataTransfer.setData('Text', ''); }

    // Creates a div to wrap a copy of the selected element, and float it along the dragging
    let ghost = document.getElementById('bf-drag-ghost-id');
    if (!!ghost) { ghost.remove(); }
    ghost = document.createElement('div');
    this.renderer.setAttribute(ghost, 'id', 'bf-drag-ghost-id');
    this.renderer.setAttribute(ghost, 'class', 'bf-drag-ghost');
    this.renderer.appendChild(ghost, this.el.nativeElement.cloneNode(true));
    this.renderer.appendChild(document.body, ghost);
    // this.renderer.appendChild(this.el.nativeElement.parentNode, ghost);
    this.renderer.setStyle(ghost, 'position', 'fixed');
    this.renderer.setStyle(ghost, 'top', '-2500px');
    this.renderer.setStyle(ghost, 'left', '-2500px');

    if (this.bfDnD.setShadowSize) {
      const dragRect = this.el.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(ghost, 'width', dragRect.width + 'px');
      this.renderer.setStyle(ghost, 'height', dragRect.height + 'px');
    }


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

  }

  private setDragImage = (event, ghost) => {
    const renderedShadowRect = document.getElementById('bf-drag-ghost-id').getBoundingClientRect();
    this.bfDnD.ghostHalfWidth = renderedShadowRect.width / 2;
    this.bfDnD.ghostHalfHeight = renderedShadowRect.height / 2;
    if (event.type !== 'touchmove') {
      event.dataTransfer.setDragImage(ghost, this.bfDnD.ghostHalfWidth, this.bfDnD.ghostHalfHeight);
    }
  };

  // When dropping
  @HostListener('dragend', ['$event']) dragend(event) {
    // console.log('[bfDraggable] --> dragend');
    this.isDragging = false;
    this.bfDnD.dragEnd();
    const ghost = document.getElementById('bf-drag-ghost-id');
    if (!!ghost) { ghost.remove(); }
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
        ghost.style.left = (clientX - this.bfDnD.ghostHalfWidth) + 'px';
        ghost.style.top = (clientY - this.bfDnD.ghostHalfHeight) + 'px';
      }
    }
  }

  // When the touch dragging ends by dropping
  @HostListener('touchend', ['$event']) touchend(event) {
    if (this.bfDnD.activeContainer) { this.bfDnD.activeContainer.onDrop(event); }
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
