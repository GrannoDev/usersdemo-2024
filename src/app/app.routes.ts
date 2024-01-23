import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'users',
		loadComponent: () => import('./components/user-list.component'),
	},
	{
		path: 'users/:id',
		loadComponent: () => import('./components/user-details.component'),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'users',
	},
];
