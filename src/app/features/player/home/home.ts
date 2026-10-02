import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOGO_DARK, LOGO_LIGHT } from './logos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  readonly logoDark = LOGO_DARK;
  readonly logoLight = LOGO_LIGHT;

  selectedLocation = 'Mumbai';
  selectedDate = '';
  players = 10;

  // Used if any turf image fails to load (known-good cricket photo)
  readonly fallbackImage =
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=700';

  turfs = [
    {
      name: 'Game On Turf',
      location: 'Thane West, Mumbai',
      price: 1200,
      rating: 4.8,
      reviews: 120,
      amenities: ['Floodlights', 'Parking', 'Washroom'],
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=700'
    },
    {
      name: 'Skyline Cricket Arena',
      location: 'Navi Mumbai',
      price: 1000,
      rating: 4.6,
      reviews: 98,
      amenities: ['Night Play', 'Parking', 'Changing Room'],
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=700'
    },
    {
      name: 'ProTurf Indoor',
      location: 'Thane',
      price: 1500,
      rating: 4.7,
      reviews: 85,
      amenities: ['Indoor', 'Washroom', 'Parking'],
      // Unsplash "A cricket stadium with empty stands and a clear sky" (zXhuzlcri7s)
      image: 'https://unsplash.com/photos/zXhuzlcri7s/download?force=true&w=700'
    },
    {
      name: 'Cricket Zone',
      location: 'Kharghar, Navi Mumbai',
      price: 900,
      rating: 4.5,
      reviews: 64,
      amenities: ['Practice Nets', 'Parking', 'Lighting'],
      // Unsplash "A view of a cricket stadium from across the field" (h_-D1L3m6cg)
      image: 'https://unsplash.com/photos/h_-D1L3m6cg/download?force=true&w=700'
    }
  ];

  features = [
    { icon: '⌕', title: 'Wide Selection', description: 'Explore verified turfs near you.' },
    { icon: '⚡', title: 'Instant Booking', description: 'Real-time availability and easy booking.' },
    { icon: '✓', title: 'Verified Turfs', description: 'Quality facilities with trusted owners.' },
    { icon: '♧', title: 'Play with Friends', description: 'Create squads and manage bookings.' },
    { icon: '🏆', title: 'For Every Cricketer', description: 'From casual games to tournaments.' }
  ];

  popularCities = ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune', 'Bangalore', 'Delhi'];

  selectCity(city: string) {
    this.selectedLocation = city;
  }

  searchTurfs() {
    console.log('Searching turfs:', {
      location: this.selectedLocation,
      date: this.selectedDate,
      players: this.players
    });
  }

  viewTurf(turfName: string) {
    console.log('Viewing turf:', turfName);
  }

  listYourTurf() {
    console.log('Redirect to turf owner registration');
  }

  // Swap a broken image for the fallback once (guard prevents a loop)
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallback']) return;
    img.dataset['fallback'] = '1';
    img.src = this.fallbackImage;
  }
}