import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'concatName',
	standalone: true,
})
export class ConcatNamePipe implements PipeTransform {
	transform(value: { title: string; first: string; last: string }): string {
		if (value) {
			return `${value.title} ${value.first} ${value.last}`;
		}

		return '';
	}
}
