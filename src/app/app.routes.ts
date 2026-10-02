
import { Routes } from '@angular/router';
import { Home } from './features/player/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: '**',
    redirectTo: ''
  }
];
