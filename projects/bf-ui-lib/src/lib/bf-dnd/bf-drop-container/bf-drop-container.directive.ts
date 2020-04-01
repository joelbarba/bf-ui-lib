import {Component, Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {BfGrowlService} from '../../bf-growl/bf-growl.service';
import {BfDnDService} from '../bf-dnd.service';

@Directive({ selector: '[bfDropContainer]' })
export class BfDropContainerDirective implements OnChanges {
  @Input() bfDropContainer;

  @HostBinding('class.dragging-over') private isDraggingOver = false;

  constructor(
    private el: ElementRef,
    public bfDnD: BfDnDService,
    public growl: BfGrowlService
  ) { }

  ngOnChanges(changes) {}


  @HostListener('dragover', ['$event']) dragover(event: any) {
    this.isDraggingOver = true;
    event.preventDefault();
  }

  @HostListener('dragenter') dragenter() {
    this.isDraggingOver = true;
  }

  @HostListener('dragleave') dragleave() {
    this.isDraggingOver = false;
  }

  @HostListener('drop', ['$event']) drop(event: any) {
    this.isDraggingOver = false;
    // if (!!BfDnD.activePlaceholder && !!BfDnD.activePlaceholder.element) {
    //   BfDnD.activePlaceholder.element.removeClass('active-placeholder');
    // }
    this.bfDnD.dropInto(event, this.el, this.bfDropContainer);
    event.preventDefault();
  }
}
