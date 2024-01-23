import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { LoadingComponent } from '../shared/components/loading.component';
import { ConcatNamePipe } from '../shared/pipes/concat-name.pipe';
import { UserService } from '../shared/services/user.service';

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [ConcatNamePipe, RouterLink, LoadingComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex py-4">
			<input
				class="mx-auto min-w-96 rounded-full border border-gray-200 px-6 py-3"
				type="text"
				[formControl]="search"
				placeholder="search..." />
		</div>
		<div class="flex flex-wrap items-center justify-center gap-4">
			@for (user of usersFiltered(); track $index) {
				<div
					[routerLink]="user.id.value"
					class="flex w-96 cursor-pointer gap-6 rounded-lg border border-gray-100 p-4 shadow-md">
					<img
						class="rounded-full border border-gray-100"
						[src]="user.picture.large"
						alt="Profile picture" />
					<div class="space-y-0.5">
						<p class="text-xl font-thin">{{ user.name | concatName }}</p>
						<p class="text-blue-400">{{ user.location.city }}</p>
						<p class="text-xs text-gray-400">{{ user.email }}</p>
						<p class="text-xs text-gray-400">{{ user.phone }}</p>
					</div>
				</div>
			} @empty {
				<app-loading />
			}
		</div>
	`,
})
export default class UserListComponent {
	readonly userService = inject(UserService);
	search = new FormControl<string>('');
	testSig = toSignal(this.userService.testObs, {
		requireSync: true,
	});
	filter = signal<string | null>('');

	usersFiltered = computed(() => {
		return this.filter()
			? this.userService.users().filter((user) => {
					const name = `${user.name.first} ${user.name.last}`.toLowerCase();
					return name.includes(this.filter()!.toLowerCase());
				})
			: this.userService.users();
	});
	constructor() {
		this.search.valueChanges
			.pipe(takeUntilDestroyed(), debounceTime(500))
			.subscribe((value) => {
				this.filter.set(value);
			});
	}
}
