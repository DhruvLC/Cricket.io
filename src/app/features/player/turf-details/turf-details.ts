
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface TurfDetail {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  sport: string;
  description: string;
  images: string[];
  amenities: string[];
  available: boolean;
}

@Component({
  selector: 'app-turf-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turf-details.html',
  styleUrl: './turf-details.css'
})
export class TurfDetails implements OnInit {

  selectedDate = this.getToday();
  selectedSlot = '';
  selectedImage = '';

  minDate = this.getToday();

  timeSlots = [
    '06:00 AM - 07:00 AM',
    '07:00 AM - 08:00 AM',
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
    '08:00 PM - 09:00 PM',
    '09:00 PM - 10:00 PM'
  ];

  turfs: TurfDetail[] = [
    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Hiranandani Estate',
      city: 'Thane',
      price: 1200,
      rating: 4.8,
      reviews: 124,
      sport: 'Cricket',
      description: 'Enjoy a great cricket experience at Elite Cricket Arena. This venue offers a spacious playing area, quality facilities and a convenient location for your next match.',
      images: [
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=85',
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=85'
      ],
      amenities: ['Floodlights', 'Parking', 'Changing Room', 'Drinking Water'],
      available: true
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
      description: 'Bring your friends together for an exciting box cricket match at PlayZone. Enjoy a dedicated cricket playing space with convenient facilities.',
      images: [
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=85',
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=85'
      ],
      amenities: ['Floodlights', 'Changing Room', 'Drinking Water'],
      available: true
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
      description: 'Champions Cricket Arena provides a spacious venue for cricket enthusiasts. Gather your team and enjoy your next game at this well-equipped ground.',
      images: [
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=85',
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=85'
      ],
      amenities: ['Floodlights', 'Parking', 'Cafeteria', 'Changing Room'],
      available: true
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
      description: 'PowerPlay Cricket Ground is a convenient venue for local cricket matches. Book your preferred time and get your team ready to play.',
      images: [
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=85',
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=85'
      ],
      amenities: ['Parking', 'Floodlights', 'Drinking Water'],
      available: true
    }
  ];

  turf: TurfDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.turf = this.turfs.find(item => item.id === id);

    if (this.turf) {
      this.selectedImage = this.turf.images[0];
    }
  }

  getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  selectSlot(slot: string): void {
    this.selectedSlot = slot;
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  bookNow(): void {
    if (!this.turf || !this.selectedDate || !this.selectedSlot) {
      return;
    }

    this.router.navigate(['/booking', this.turf.id], {
      queryParams: {
        date: this.selectedDate,
        slot: this.selectedSlot
      }
    });
  }

}