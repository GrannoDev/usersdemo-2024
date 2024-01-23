import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, of, take } from 'rxjs';
import { User, UserResponse } from '../model/user';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private http = inject(HttpClient);

	#users = signal<User[]>([]);

	users = computed(() => this.#users());

	testObs = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	constructor() {
		this.loadUsers();
	}

	loadUsers() {
		this.http
			.get<UserResponse>(
				'https://randomuser.me/api/?exc=login,registered,nat&noinfo&results=20'
			)
			.pipe(
				take(1),
				map((response) => response.results),
				map((users) => users.filter((user) => user.id.value !== null))
			)
			.subscribe((users) => {
				this.#users.set(users);
			});
	}
}
