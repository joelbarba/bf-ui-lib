import {
  Component,
  Directive,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {BfGrowlService} from '../../bf-growl/bf-growl.service';
import {BfDnDService} from '../bf-dnd.service';

@Directive({ selector: '[bfDropContainer]' })
export class BfDropContainerDirective implements OnChanges {
  @Input() bfDropContainer;
  @Input() id;

  @Output() bfDrop = new EventEmitter<any>();

  @HostBinding('class.dragging-over') private isDraggingOver = false;

  private dragStatus = 0; // 0=none, 1=over, 2=leaving
  private readonly container: { id, element, model };
  private dragOverSub;

  constructor(
    private el: ElementRef,
    public bfDnD: BfDnDService,
    public growl: BfGrowlService
  ) {

    this.id = this.id || 'bf-drop-container-' + this.bfDnD.containers.length;

    if (!!this.id) { // Make sure it's not registered yet
      for (let ind = 0; ind < this.bfDnD.containers.length; ind++) {
        if (this.bfDnD.containers[ind].id === this.id) {
          console.error('Alert: [bfDropContainer] with a duplicated ID: ', this.id);
          this.bfDnD.containers.splice(ind, 1);
          break;
        }
      }
    }

    // Register the element in BfDnD.containers[]
    this.container = { id: this.id, element: this.el.nativeElement, model: this.bfDropContainer };
    this.bfDnD.containers.push(this.container);

    this.dragOverSub = this.bfDnD.touchDragOver$.subscribe(container => {
      console.log('DRAAAAAw', container);
    });
  }

  ngOnChanges(changes) {}


  @HostListener('dragover', ['$event']) dragover(event: any) {
    this.isDraggingOver = true;
    this.dragStatus = 1; // over
    this.bfDnD.activeContainer = this.container;
    //
    // // This weird function is to delay the placeholder's position calculation
    // // If the placeholder positions are constantly changing, only recalculate their center position every .5 seconds
    // // This should give enough time for animations or other transitions (expanding placeholders)
    // function calcPositions() {
    //   if (!!delayTimeout && delayTimeout.$$state.status === 0) {  // If timeout running
    //     isDelayed = true;
    //   } else {
    //
    //     // Calc the center position for every placeholder
    //     allPlaceholders.forEach(function(placeholder) {
    //       var dropSpot = placeholder.element.get(0).getBoundingClientRect();
    //       placeholder.midX = dropSpot.left + (dropSpot.width / 2);
    //       placeholder.midY = dropSpot.top + (dropSpot.height / 2);
    //
    //       if (isAccurateMode) {
    //         placeholder.rect = {
    //           left   : dropSpot.left,
    //           right  : dropSpot.left + dropSpot.width,
    //           top    : dropSpot.top,
    //           bottom : dropSpot.top + dropSpot.height,
    //           width  : dropSpot.width,
    //           height : dropSpot.height
    //         }
    //       }
    //     });
    //
    //     // Set the timeout to avoid triggering that again for the next 0.5s
    //     delayTimeout = $timeout(function() {
    //       if (isDelayed) {
    //         delayTimeout = null;
    //         isDelayed = false;
    //         calcPositions();
    //       }
    //     }, 500);
    //   }
    // }
    //
    // calcPositions();
    //
    // // Select which placeholders is closest to the dragging option
    // var closestPlaceholder = null;
    // if (!isAccurateMode) {
    //
    //   // It calculates the distance between the placeholder center
    //   // and the mouse pointer for every placeholder, and takes the element with the lowest.
    //   allPlaceholders.forEach(function(placeholder) { // Find the closest placeholder
    //     // Pythagoras:
    //     placeholder.distance = (($event.clientX - placeholder.midX) * ($event.clientX - placeholder.midX))
    //       + (($event.clientY - placeholder.midY) * ($event.clientY - placeholder.midY));
    //
    //     if (!closestPlaceholder || placeholder.distance < closestPlaceholder.distance) {
    //       closestPlaceholder = placeholder;
    //     }
    //   });
    //
    // } else {
    //
    //   // Accurate mode calculation.
    //   // Find out the shortest distance between the borders (rectangles) of the placeholder and the shadow
    //   // To do so, we asses the different cases that positioning can have:
    //   // Case 1, 3, 5, 7 --> They are not aligned, so the shortest distance goes from one corner to another
    //   // Case 2, 6 --> Aligned vertically: the shortest distance is the difference between top/bottom margins
    //   // Case 4, 8 --> Aligned horizontally: the shortest distance is the difference between left/right margins
    //   // Case 88, 99 --> Intersection. In case of intersection (part or all shadow is inside the placeholder),
    //   //                 instead of calculating the distance between 2 points, we calculate the square area
    //   //                 that intersects. We set this value as negative, so the bigger the area, the closest
    //   //                 we assume the placeholder is from the shadow (biggest intersection = active placeholder)
    //   var shadowRect = {
    //     left   : $event.clientX - renderedShadowRect.halfWidth,
    //     right  : $event.clientX + renderedShadowRect.halfWidth,
    //     top    : $event.clientY - renderedShadowRect.halfHeight,
    //     bottom : $event.clientY + renderedShadowRect.halfHeight
    //   };
    //   allPlaceholders.forEach(function(placeholder) {
    //     var sh = shadowRect;
    //     var ph = placeholder.rect;
    //     var x = 0, y = 0;
    //
    //     if (!isDebugMode) {
    //
    //       // In those cases, calc the distance from the angles (no possible intersection)
    //       if      (sh.right < ph.left && sh.bottom < ph.top) {  x = ph.left - sh.right; y = ph.top - sh.bottom; } // Case 1
    //       else if (sh.left > ph.right && sh.bottom < ph.top) {  x = ph.right - sh.left; y = ph.top - sh.bottom; } // Case 3
    //       else if (sh.left > ph.right && sh.top > ph.bottom) {  x = sh.left - ph.right; y = sh.top - ph.bottom; } // Case 5
    //       else if (sh.right < ph.left && sh.top > ph.bottom) {  x = ph.left - sh.right; y = ph.bottom - sh.top; } // Case 7
    //       else if (sh.left <= ph.right && sh.right >= ph.left) {
    //         if      (sh.bottom < ph.top) { y = ph.top - sh.bottom; x = 0; } // Case 2
    //         else if (sh.top > ph.bottom) { y = sh.top - ph.bottom; x = 0; } // Case 6
    //       } else if (sh.top <= ph.bottom && sh.bottom >= ph.top) {
    //         if      (sh.left > ph.right) { x = sh.left - ph.right; y = 0; } // Case 4
    //         else if (sh.right < ph.left) { x = sh.right - ph.left; y = 0; } // Case 8
    //       }
    //       if (!!x || !!y) {
    //         placeholder.distance = ((x*x)+(y*y)); // Distance between corners
    //       } else {
    //         x = Math.abs((sh.right > ph.right ? ph.right : sh.right) - (sh.left < ph.left ? ph.left : sh.left));
    //         y = Math.abs((sh.top < ph.top ? ph.top : sh.top) - (sh.bottom > ph.bottom ? ph.bottom : sh.bottom));
    //         placeholder.distance = (x * y * -1); // Intersection area
    //       }
    //
    //     } else {
    //       debugDistCalc(placeholder, shadowRect);
    //       placeholder.distance = placeholder.minDistArr[4];
    //     }
    //
    //     if (isNaN(placeholder.distance)) { placeholder.distance = 99999; }
    //
    //     if (!closestPlaceholder || placeholder.distance < closestPlaceholder.distance) {
    //       closestPlaceholder = placeholder;
    //     }
    //   });
    // }
    //
    // // If the active placeholder has to change (or be removed), switch the 'active-placeholder' class
    // if (!BfDnD.activePlaceholder || !closestPlaceholder || (BfDnD.activePlaceholder !== closestPlaceholder)) {
    //   if (!!BfDnD.activePlaceholder && !!BfDnD.activePlaceholder.element) {
    //     BfDnD.activePlaceholder.element.removeClass('active-placeholder');
    //   }
    //   if (!!closestPlaceholder && !!closestPlaceholder.element) {
    //     BfDnD.activePlaceholder = closestPlaceholder;
    //     BfDnD.activePlaceholder.element.addClass('active-placeholder');
    //   }
    // }
    //
    // if (isDebugMode) { debugRenderCanvas(allPlaceholders, closestPlaceholder, $rootScope, $event, BfDnD, $element); }



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
    this.bfDrop.next({ bfDraggable: this.bfDnD.bfDraggable, bfDropContainer: this.bfDropContainer });
    this.bfDnD.dropInto(event, this.el, this.bfDropContainer);
    event.preventDefault();
  }




  // @HostListener('mouseover', ['$event']) mouseover(event) {
  //   console.log('container - mouseover');
  //   event.preventDefault();
  // }
  // @HostListener('mouseenter', ['$event']) mouseenter(event) {
  //   console.log('container - mouseenter');
  // }
  // @HostListener('mousemove', ['$event']) mousemove(event) {
  //   // if (this.bfDnD.isDragging) {
  //     console.log('container - dragging over');
  //     event.preventDefault();
  //   // }
  // }
}
