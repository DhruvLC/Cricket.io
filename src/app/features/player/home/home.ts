
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LOGO_DARK, LOGO_LIGHT } from './logos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router) {}

  readonly logoDark = LOGO_DARK;
  readonly logoLight = LOGO_LIGHT;

  selectedLocation = 'Mumbai';
  selectedDate = '';
  players = 10;

  // Fallback image if a turf image fails to load
  readonly fallbackImage =
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=700';

  // Same four cricket venues as the Explore Turfs page
  turfs = [
    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Hiranandani Estate, Thane',
      price: 1200,
      rating: 4.8,
      reviews: 124,
      amenities: ['Floodlights', 'Parking', 'Changing Room'],
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1000&q=85'
    },
    {
      id: 3,
      name: 'PlayZone Box Cricket',
      location: 'Manpada, Thane',
      price: 900,
      rating: 4.6,
      reviews: 76,
      amenities: ['Floodlights', 'Changing Room'],
      image: 'https://images.unsplash.com/photo-1593766827228-8737b4cd1472?w=1000&q=85'
    },
    {
      id: 4,
      name: 'Champions Sports Arena',
      location: 'Vashi, Navi Mumbai',
      price: 1800,
      rating: 4.9,
      reviews: 156,
      amenities: ['Floodlights', 'Parking', 'Cafeteria'],
      image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1000&q=85'
    },
    {
      id: 6,
      name: 'PowerPlay Cricket Ground',
      location: 'Boisar, Palghar',
      price: 800,
      rating: 4.4,
      reviews: 42,
      amenities: ['Parking', 'Floodlights'],
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&q=85'
    }
  ];

  features = [
    {
      icon: '⌕',
      title: 'Wide Selection',
      description: 'Explore verified cricket turfs near you.'
    },
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Real-time availability and easy booking.'
    },
    {
      icon: '✓',
      title: 'Verified Turfs',
      description: 'Quality facilities with trusted owners.'
    },
    {
      icon: '♧',
      title: 'Play with Friends',
      description: 'Create squads and manage bookings.'
    },
    {
      icon: '🏆',
      title: 'For Every Cricketer',
      description: 'From casual games to tournaments.'
    }
  ];

  popularCities = [
    'Mumbai',
    'Thane',
    'Navi Mumbai',
    'Pune',
    'Bangalore',
    'Delhi'
  ];

  selectCity(city: string): void {
    this.selectedLocation = city;
  }

  // Search and navigate to Explore Turfs
  searchTurfs(): void {
    this.router.navigate(['/turfs'], {
      queryParams: {
        location: this.selectedLocation,
        date: this.selectedDate || null,
        players: this.players
      }
    });
  }

  // Navigate to the selected turf's details page
  viewTurf(turfId: number): void {
    this.router.navigate(['/turf', turfId]);
  }

  // Navigate to Turf Owner listing page
  listYourTurf(): void {
    this.router.navigate(['/owner/list-turf']);
  }

  // Replace a broken image with the fallback image
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (img.dataset['fallback']) {
      return;
    }

    img.dataset['fallback'] = '1';
    img.src = this.fallbackImage;
  }
}