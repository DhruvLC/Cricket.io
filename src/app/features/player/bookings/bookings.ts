
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BookingRecord {
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
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class Bookings implements OnInit {

  private readonly STORAGE_KEY = 'cricketBookings';

  bookings: BookingRecord[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const savedBookings = localStorage.getItem(this.STORAGE_KEY);

      this.bookings = savedBookings
        ? JSON.parse(savedBookings)
        : [];

      this.bookings.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

    } catch (error) {
      console.error('Unable to load bookings:', error);
      this.bookings = [];
    }
  }

  get totalBookings(): number {
    return this.bookings.length;
  }

  get upcomingBookings(): number {
    const today = this.getLocalDate();

    return this.bookings.filter(
      booking =>
        booking.date >= today &&
        booking.status !== 'Cancelled'
    ).length;
  }

  get totalSpent(): number {
    return this.bookings
      .filter(booking => booking.status !== 'Cancelled')
      .reduce((total, booking) => total + booking.totalAmount, 0);
  }

  getLocalDate(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  isUpcoming(booking: BookingRecord): boolean {
    return (
      booking.date >= this.getLocalDate() &&
      booking.status !== 'Cancelled'
    );
  }

  trackByBooking(index: number, booking: BookingRecord): string {
    return booking.id;
  }

}