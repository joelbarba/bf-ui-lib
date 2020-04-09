import {
  Component,
  Directive,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output, Renderer2
} from '@angular/core';
import {BfDnDService} from '../bf-dnd.service';

@Directive({ selector: '[bfDropContainer]' })
export class BfDropContainerDirective implements OnChanges, OnDestroy {
  @Input() bfDropContainer;
  @Input() bfDragGroup;
  @Input() id;

  @Output() bfDrop = new EventEmitter<any>();

  @HostBinding('class.bf-drop-container') elementClass = true;
  @HostBinding('class.dragging-over') private isDraggingOver = false;

  public container;

  constructor(
    private el: ElementRef,
    private bfDnD: BfDnDService,
    private renderer: Renderer2,
  ) {
    this.id = this.bfDnD.getUniqueId(this.bfDnD.containers, 'bf-drop-container-');
    if (!this.id) { return; }

    this.container = {
      id          : this.id,
      element     : this.el.nativeElement,
      model       : this.bfDropContainer,
      dragStatus  : 0, // 0=none, 1=over, 2=leaving
      bfDragGroup : undefined,
      onDragOver  : (e) => this.dragover(e),
      onDragEnter : (e) => this.dragenter(e),
      onDragLeave : (e) => this.dragleave(e),
      onDrop      : (e) => this.drop(e),
      getDragging : () => this.isDraggingOver,
      setDragging : (value) => this.isDraggingOver = value,
    };

    this.bfDnD.containers.push(this.container); // Register the element in BfDnD.containers[]
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('id')) {
      if (!this.bfDnD.containers.getById(this.id)) {
        this.container.id = this.id;
      } else {
        console.error('[bfDropContainer] id is not unique: ', this.id);
      }
    }

    if (changes.hasOwnProperty('bfDropContainer')) {
      this.container.model = this.bfDropContainer;
    }

    // Add a css class with the bfDragGroup value
    if (changes.hasOwnProperty('bfDragGroup')) {
      this.container.bfDragGroup = this.bfDragGroup;
      if (this.bfDragGroup) {
        this.renderer.addClass(this.el.nativeElement, this.bfDragGroup);
      } else if (changes.bfDragGroup.previousValue) {
        this.renderer.removeClass(this.el.nativeElement, changes.bfDragGroup.previousValue);
      }
    }
  }

  ngOnDestroy() { // Unregister on destroy
    this.bfDnD.containers.removeById(this.container.id);
  }


  @HostListener('dragover', ['$event']) dragover(event: any) {
    if (!this.bfDnD.isDragging) { return false; } // Dragging something that is not a bfDraggable
    if (this.bfDnD.draggingGroup !== this.container.bfDragGroup) { return false; } // Cross dragging groups

    event.preventDefault();
    if (this.bfDnD.bfNestedContainers) { event.stopPropagation(); }

    // console.log('dragover', this.container.id);
    this.container.setDragging(true);
    this.container.dragStatus = 1; // over
    if (this.bfDnD.activeContainer !== this.container) {
      this.bfDnD.activeContainer = this.container;
      this.bfDnD.activeContainer$.next(this.container);
    }
    this.bfDnD.dragOverRender(this.container, event); // Calculate active placeholder
  }


  @HostListener('dragenter', ['$event']) dragenter(event) {
    if (!this.bfDnD.isDragging) { return false; } // Dragging something that is not a bfDraggable
    if (this.bfDnD.draggingGroup !== this.container.bfDragGroup) { return false; } // Cross dragging groups

    if (this.el.nativeElement.contains(event.fromElement)) {
      return false; // That means you are switching elements within the container
    }

    event.preventDefault();
    console.log('dragenter', this.container.id);
    this.container.setDragging(true);
    this.container.dragStatus = 1; // over
    this.bfDnD.calcPositions(this.container);
  }


  @HostListener('dragleave', ['$event']) dragleave(event) {
    if (!this.bfDnD.isDragging) { return false; } // Dragging something that is not a bfDraggable
    if (this.bfDnD.draggingGroup !== this.container.bfDragGroup) { return false; } // Cross dragging groups
    if (this.el.nativeElement.contains(event.fromElement)) {
      return false; // That means you are switching elements within the container
    }

    event.preventDefault();
    console.log('drag leave', this.container.id);
    this.container.dragStatus = 2; // leaving
    setTimeout(() => {
      if (this.container.dragStatus === 2) {
        this.container.dragStatus = 0; // none
        this.container.setDragging(false);
        if (this.bfDnD.activePlaceholder) {
          this.bfDnD.activePlaceholder.setActive(false);
          this.bfDnD.activePlaceholder = null;
          this.bfDnD.activePlaceholder$.next(null);
        }
        if (this.bfDnD.activeContainer === this.container) {
          this.bfDnD.activeContainer = null;
          this.bfDnD.activeContainer$.next(null);
        }
      }
    }, 50);
  }

  @HostListener('drop', ['$event']) drop(event: any) {
    if (this.bfDnD.draggingGroup !== this.container.bfDragGroup) { return false; } // Cross dragging groups

    event.preventDefault();
    if (this.bfDnD.bfNestedContainers) { event.stopPropagation(); }

    this.container.setDragging(false);
    if (!!this.bfDnD.activePlaceholder) { this.bfDnD.activePlaceholder.setActive(false); }
    this.bfDrop.next({
      bfDraggable: this.bfDnD.bfDraggable,
      bfDropContainer: this.bfDropContainer,
      bfDropPlaceholder: this.bfDnD.activePlaceholder,
    });
    this.bfDnD.dropInto(event, this.el, this.bfDropContainer);
  }

}
