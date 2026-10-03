
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface Turf {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
}

export interface BookingRecord {
  id: string;
  bookingReference: string;
  turfId: number;
  turfName: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  players: number;
  pricePerHour: number;
  subtotal: number;
  platformFee: number;
  totalAmount: number;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking implements OnInit {

  private readonly STORAGE_KEY = 'cricketBookings';

  turfId = 1;

  turfs: Turf[] = [
    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Hiranandani Estate, Thane',
      price: 1200,
      rating: 4.8
    },
    {
      id: 3,
      name: 'PlayZone Box Cricket',
      location: 'Manpada, Thane',
      price: 900,
      rating: 4.6
    },
    {
      id: 4,
      name: 'Champions Sports Arena',
      location: 'Vashi, Navi Mumbai',
      price: 1800,
      rating: 4.9
    },
    {
      id: 6,
      name: 'PowerPlay Cricket Ground',
      location: 'Boisar, Palghar',
      price: 800,
      rating: 4.4
    }
  ];

  turf: Turf = this.turfs[0];

  today = this.getLocalDate();
  selectedDate = this.today;
  selectedTime = '';

  selectedDuration = 1;
  players = 10;

  timeSlots = [
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM'
  ];

  customer = {
    name: '',
    phone: '',
    email: ''
  };

  bookingConfirmed = false;
  bookingReference = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Get selected turf ID
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.turfId = id || 1;

    const selectedTurf = this.turfs.find(
      item => item.id === this.turfId
    );

    if (selectedTurf) {
      this.turf = selectedTurf;
    }

    // Read date and time from URL query parameters
    const queryParams = this.route.snapshot.queryParamMap;

    const date = queryParams.get('date');
    const slot = queryParams.get('slot');

    if (date) {
      this.selectedDate = date;
    }

    if (slot) {
      this.selectedTime = slot.includes(' - ')
        ? slot.split(' - ')[0]
        : slot;
    }
  }

  private getLocalDate(): string {

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  selectDuration(duration: number): void {
    this.selectedDuration = duration;
  }

  get subtotal(): number {
    return this.turf.price * this.selectedDuration;
  }

  get platformFee(): number {
    return Math.round(this.subtotal * 0.02);
  }

  get totalAmount(): number {
    return this.subtotal + this.platformFee;
  }

  private saveBooking(): boolean {

    const newBooking: BookingRecord = {

      id: this.bookingReference,
      bookingReference: this.bookingReference,

      turfId: this.turf.id,
      turfName: this.turf.name,
      location: this.turf.location,

      date: this.selectedDate,
      time: this.selectedTime,

      duration: this.selectedDuration,
      players: this.players,

      pricePerHour: this.turf.price,

      subtotal: this.subtotal,
      platformFee: this.platformFee,
      totalAmount: this.totalAmount,

      customer: {
        name: this.customer.name.trim(),
        phone: this.customer.phone,
        email: this.customer.email.trim()
      },

      status: 'Confirmed',

      createdAt: new Date().toISOString()
    };

    try {

      const existingBookings: BookingRecord[] =
        JSON.parse(
          localStorage.getItem(this.STORAGE_KEY) || '[]'
        );

      existingBookings.unshift(newBooking);

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(existingBookings)
      );

      return true;

    } catch (error) {

      console.error('Unable to save booking:', error);

      alert('Unable to save your booking. Please try again.');

      return false;
    }
  }

  onConfirm(): void {

    // Validate booking information
    if (
      !this.selectedDate ||
      !this.selectedTime ||
      !this.customer.name.trim() ||
      !/^[6-9]\d{9}$/.test(this.customer.phone) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.customer.email.trim())
    ) {
      return;
    }

    // Generate booking reference
    this.bookingReference =
      'CRK' + Date.now().toString().slice(-8);

    // Save booking before showing confirmation
    const saved = this.saveBooking();

    if (!saved) {
      this.bookingReference = '';
      return;
    }

    this.bookingConfirmed = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  goToTurf(): void {
    this.router.navigate(['/turf', this.turfId]);
  }

}