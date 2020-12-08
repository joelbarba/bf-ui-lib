import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isMatch',
  pure: false
})
export class BfDropdownA11yPipe implements PipeTransform {
  public transform(list: Array<any>): Array<any> {
    return list.filter((item) => item.$isMatch);
  }
}
