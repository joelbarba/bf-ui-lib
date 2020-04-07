import {
  Component,
  Directive,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {BfDnDService} from '../bf-dnd.service';

@Directive({ selector: '[bfDropContainer]' })
export class BfDropContainerDirective implements OnChanges, OnDestroy {
  @Input() bfDropContainer;
  @Input() id;

  @Output() bfDrop = new EventEmitter<any>();

  @HostBinding('class.bf-drop-container') elementClass = true;
  @HostBinding('class.dragging-over') private isDraggingOver = false;

  public container;

  constructor(
    private el: ElementRef,
    public bfDnD: BfDnDService,
  ) {
    this.id = this.bfDnD.getUniqueId(this.bfDnD.containers, 'bf-drop-container-');
    if (!this.id) { return; }

    this.container = {
      id          : this.id,
      element     : this.el.nativeElement,
      model       : this.bfDropContainer,
      dragStatus  : 0, // 0=none, 1=over, 2=leaving
      onDragOver  : (e) => this.dragover(e),
      onDragEnter : (e) => this.dragenter(e),
      onDragLeave : (e) => this.dragleave(e),
      onDrop      : (e) => this.drop(e),
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
  }

  ngOnDestroy() { // Unregister on destroy
    this.bfDnD.containers.removeById(this.container.id);
  }


  @HostListener('dragover', ['$event']) dragover(event: any) {
    // console.log('dragover', this.container.id);
    this.isDraggingOver = true;
    this.container.dragStatus = 1; // over
    this.bfDnD.activeContainer = this.container;
    this.bfDnD.dragOverRender(this.container, event); // Calculate active placeholder

    event.preventDefault();
    if (this.bfDnD.bfNestedContainers) { event.stopPropagation(); }
  }

  @HostListener('dragenter', ['$event']) dragenter(event) {
    if (this.el.nativeElement.contains(event.fromElement)) {
      return false; // That means you are switching elements within the container
    }
    console.log('dragenter', this.container.id);
    this.isDraggingOver = true;
    this.container.dragStatus = 1; // over
    this.bfDnD.calcPositions(this.container);
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) dragleave(event) {
    if (this.el.nativeElement.contains(event.fromElement)) {
      return false; // That means you are switching elements within the container
    }
    console.log('drag leave', this.container.id);
    this.container.dragStatus = 2; // leaving
    setTimeout(() => {
      if (this.container.dragStatus === 2) {
        this.container.dragStatus = 0; // none
        this.isDraggingOver = false;
        if (!!this.bfDnD.activePlaceholder) {
          this.bfDnD.activePlaceholder.setActive(false);
          this.bfDnD.activePlaceholder = null;
        }
        this.bfDnD.activeContainer = null;
      }
    }, 50);
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) drop(event: any) {
    console.log('drop', this.container.id);
    this.isDraggingOver = false;
    if (!!this.bfDnD.activePlaceholder) { this.bfDnD.activePlaceholder.setActive(false); }
    this.bfDrop.next({ bfDraggable: this.bfDnD.bfDraggable, bfDropContainer: this.bfDropContainer });
    this.bfDnD.dropInto(event, this.el, this.bfDropContainer);
    event.preventDefault();
    if (this.bfDnD.bfNestedContainers) { event.stopPropagation(); }
  }

}
