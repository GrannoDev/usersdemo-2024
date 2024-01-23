import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
	template: `
		<div class="container mx-auto flex items-center justify-between p-4">
			<h1 class="cursor-pointer text-xl font-bold" routerLink="/">User Demo</h1>
			<nav>
				<a
					routerLink="users"
					routerLinkActive="text-white bg-blue-400"
					class="rounded-full px-6 py-3 transition duration-200 ease-in-out hover:bg-blue-400 hover:text-white active:scale-95"
					>Users</a
				>
			</nav>
		</div>

		<router-outlet></router-outlet>
	`,
	styles: [],
})
export class AppComponent {}
