import { JsonPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	Input,
} from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
	selector: 'app-user-details',
	standalone: true,
	imports: [JsonPipe],
	template: `
		<p class=""></p>
		<pre>{{ chosenUser() | json }}</pre>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDetailsComponent {
	@Input() id: string | null = null;
	private userService = inject(UserService);

	chosenUser = computed(() => {
		return this.userService.users().find((user) => user.id.value === this.id);
	});
}
