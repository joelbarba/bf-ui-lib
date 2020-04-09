import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {BfDnDService} from '../bf-dnd.service';
import {generateId} from '../../generate-id';


@Directive({ selector: '[bfDropPlaceholder]' })
export class BfDropPlaceholderDirective implements OnChanges, OnDestroy {
  @Input() bfDropContainerId = '';
  @Input() bfDropPlaceholder;
  @Input() bfDragGroup;
  @Input() id;

  @HostBinding('class.bf-drop-placeholder') elementClass = true;
  @HostBinding('class.active-placeholder') isActive = false;

  public placeholder;

  constructor(
    private el: ElementRef,
    private bfDnD: BfDnDService,
    private renderer: Renderer2,
  ) {

    this.id = this.bfDnD.getUniqueId(this.bfDnD.placeholders, 'bf-drop-placeholder-');
    if (!this.id) { return; }

    this.placeholder = {
      id            : this.id,
      element       : this.el.nativeElement,
      model         : this.bfDropPlaceholder,
      containerId   : this.bfDropContainerId,
      getActive     : () => this.isActive,
      setActive     : (value) => this.isActive = value,
    };

    this.bfDnD.placeholders.push(this.placeholder); // Register the placeholder
  }

  // ngOnInit() { }
  ngOnChanges(changes) {
    if (changes.hasOwnProperty('id')) {
      if (!this.bfDnD.placeholders.getById(this.id)) {
        this.placeholder.id = this.id;
      } else {
        console.error('[bfDropPlaceholder] id is not unique: ', this.id);
      }
    }

    if (changes.hasOwnProperty('bfDropPlaceholder')) { this.placeholder.model = this.bfDropPlaceholder; }
    if (changes.hasOwnProperty('bfDropContainerId')) { this.placeholder.containerId = this.bfDropContainerId; }

    // Add a css class with the bfDragGroup value
    if (changes.hasOwnProperty('bfDragGroup')) {
      if (this.bfDragGroup) {
        this.renderer.addClass(this.el.nativeElement, this.bfDragGroup);
      } else if (changes.bfDragGroup.previousValue) {
        this.renderer.removeClass(this.el.nativeElement, changes.bfDragGroup.previousValue);
      }
    }
  }

  ngOnDestroy() { // Unregister
    this.bfDnD.placeholders.removeById(this.id);
  }

}
