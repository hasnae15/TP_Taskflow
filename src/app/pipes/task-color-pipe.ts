import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskColor',
  standalone: true
})
export class TaskColorPipe implements PipeTransform {

  transform(id: number): string {
    if (id === 1) {
      return 'green';
    }

    if (id === 2) {
      return 'blue';
    }

    return 'orange';
  }
}