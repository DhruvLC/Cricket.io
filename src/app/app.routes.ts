
import { Routes } from '@angular/router';

import { Home } from './features/player/home/home';
import { Login } from './features/player/auth/login/login';
import { Signup } from './features/player/auth/signup/signup';
import { Turfs } from './features/player/turfs/turfs';
import { TurfDetails } from './features/player/turf-details/turf-details';
import { Booking } from './features/player/booking/booking';
import { Bookings } from './features/player/bookings/bookings';
import { Favorites } from './features/player/favorites/favorites';
import { Profile } from './features/player/profile/profile';

import { Dashboard } from './features/owner/dashboard/dashboard';
import { ListTurf } from './features/owner/list-turf/list-turf';

export const routes: Routes = [
  // Public Pages
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // Player Pages
  { path: 'turfs', component: Turfs },
  { path: 'turf/:id', component: TurfDetails },
  { path: 'booking/:id', component: Booking },
  { path: 'my-bookings', component: Bookings },
  { path: 'favorites', component: Favorites },
  { path: 'profile', component: Profile },

  // Owner Pages
  { path: 'owner/dashboard', component: Dashboard },
  { path: 'owner/list-turf', component: ListTurf },

  // Fallback
  { path: '**', redirectTo: '' }
];