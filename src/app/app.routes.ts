
import { Routes } from '@angular/router';

import { Home } from './features/player/home/home';
import { Login } from './features/player/auth/login/login';
import { Signup } from './features/player/auth/signup/signup';
import { Turfs } from './features/player/turfs/turfs';
import { TurfDetails } from './features/player/turf-details/turf-details';
import { Booking } from './features/player/booking/booking';
import { Bookings } from './features/player/bookings/bookings';
import { Profile } from './features/player/profile/profile';
import { Favorites } from './features/player/favorites/favorites';
import { ListTurf } from './features/owner/list-turf/list-turf';
import { Dashboard } from './features/owner/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Cricket.io | Home'
  },
  {
    path: 'turfs',
    component: Turfs,
    title: 'Find Cricket Turfs'
  },
  {
    path: 'turfs/:id',
    component: TurfDetails,
    title: 'Turf Details'
  },
  {
    path: 'login',
    component: Login,
    title: 'Login'
  },
  {
    path: 'signup',
    component: Signup,
    title: 'Create Account'
  },
  {
    path: 'booking/:id',
    component: Booking,
    title: 'Book Your Turf'
  },
  {
    path: 'my-bookings',
    component: Bookings,
    title: 'My Bookings'
  },
  {
    path: 'profile',
    component: Profile,
    title: 'My Profile'
  },
  {
    path: 'favorites',
    component: Favorites,
    title: 'My Favorites'
  },
  {
    path: 'list-your-turf',
    component: ListTurf,
    title: 'List Your Turf'
  },
  {
    path: 'owner/dashboard',
    component: Dashboard,
    title: 'Owner Dashboard'
  },
  {
    path: '**',
    redirectTo: ''
  }
];