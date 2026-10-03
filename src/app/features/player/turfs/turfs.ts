
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Turf {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  sport: string;
  image: string;
  amenities: string[];
  available: boolean;
  isFavorite: boolean;
  badge?: string;
}

@Component({
  selector: 'app-turfs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './turfs.html',
  styleUrl: './turfs.css'
})
export class Turfs {

  searchTerm = '';
  selectedLocation = 'All Locations';
  selectedSport = 'All Sports';
  sortBy = 'recommended';

  locations = [
    'All Locations',
    'Thane',
    'Navi Mumbai',
    'Mumbai',
    'Palghar'
  ];

  // Cricket-only sports categories
  sports = [
    'All Sports',
    'Cricket',
    'Box Cricket'
  ];

  // Cricket-only turf listings
  turfs: Turf[] = [

    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Hiranandani Estate',
      city: 'Thane',
      price: 1200,
      rating: 4.8,
      reviews: 124,
      sport: 'Cricket',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1000&q=85',
      amenities: ['Floodlights', 'Parking', 'Changing Room'],
      available: true,
      isFavorite: false,
      badge: 'Popular'
    },

    {
      id: 3,
      name: 'PlayZone Box Cricket',
      location: 'Manpada',
      city: 'Thane',
      price: 900,
      rating: 4.6,
      reviews: 76,
      sport: 'Box Cricket',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&q=85',
      amenities: ['Floodlights', 'Changing Room'],
      available: true,
      isFavorite: false,
      badge: 'Popular'
    },

    {
      id: 4,
      name: 'Champions Cricket Arena',
      location: 'Vashi',
      city: 'Navi Mumbai',
      price: 1800,
      rating: 4.9,
      reviews: 156,
      sport: 'Cricket',
      image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1000&q=85',
      amenities: ['Floodlights', 'Parking', 'Cafeteria'],
      available: true,
      isFavorite: false,
      badge: 'Top Rated'
    },

    {
      id: 6,
      name: 'PowerPlay Cricket Ground',
      location: 'Boisar',
      city: 'Palghar',
      price: 800,
      rating: 4.4,
      reviews: 42,
      sport: 'Cricket',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&q=85',
      amenities: ['Parking', 'Floodlights'],
      available: true,
      isFavorite: false,
      badge: 'Budget Friendly'
    }

  ];

  // Search, location and sport filtering
  get filteredTurfs(): Turf[] {

    let result = this.turfs.filter(turf => {

      const search = this.searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        turf.name.toLowerCase().includes(search) ||
        turf.location.toLowerCase().includes(search) ||
        turf.city.toLowerCase().includes(search);

      const matchesLocation =
        this.selectedLocation === 'All Locations' ||
        turf.city === this.selectedLocation;

      const matchesSport =
        this.selectedSport === 'All Sports' ||
        turf.sport === this.selectedSport;

      return matchesSearch && matchesLocation && matchesSport;
    });

    // Sorting
    if (this.sortBy === 'price-low') {

      result = [...result].sort(
        (a, b) => a.price - b.price
      );

    } else if (this.sortBy === 'price-high') {

      result = [...result].sort(
        (a, b) => b.price - a.price
      );

    } else if (this.sortBy === 'rating') {

      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );

    }

    return result;
  }

  // Add or remove favorites
  toggleFavorite(turf: Turf): void {
    turf.isFavorite = !turf.isFavorite;
  }

  // Reset all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedLocation = 'All Locations';
    this.selectedSport = 'All Sports';
    this.sortBy = 'recommended';
  }

  // Optimize Angular list rendering
  trackByTurfId(index: number, turf: Turf): number {
    return turf.id;
  }

}