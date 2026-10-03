
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-turf',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-turf.html',
  styleUrl: './list-turf.css'
})
export class ListTurf implements OnDestroy {

  // Turf Information
  listing = {
    name: '',
    description: '',
    turfType: 'Cricket',
    address: '',
    area: '',
    city: '',
    pincode: '',
    price: null as number | null,
    openingTime: '06:00',
    closingTime: '23:00',
    contactName: '',
    phone: '',
    email: ''
  };

  // Available Amenities
  amenities = [
    'Floodlights',
    'Parking',
    'Changing Room',
    'Washroom',
    'Drinking Water',
    'Seating Area',
    'Cafeteria',
    'First Aid'
  ];

  selectedAmenities: string[] = [];

  // Available Operating Days
  availableDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  selectedDays: string[] = [...this.availableDays];

  // Uploaded Turf Images
  selectedImages: { file: File; url: string }[] = [];

  // Form Submission Status
  formSubmitted = false;

  // Handle Image Upload
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const files = Array.from(input.files);
    const remainingSlots = 5 - this.selectedImages.length;

    files.slice(0, remainingSlots).forEach(file => {

      if (!file.type.startsWith('image/')) {
        return;
      }

      this.selectedImages.push({
        file: file,
        url: URL.createObjectURL(file)
      });

    });

    // Reset input to allow selecting the same image again
    input.value = '';
  }

  // Remove Uploaded Image
  removeImage(index: number): void {

    if (index < 0 || index >= this.selectedImages.length) {
      return;
    }

    URL.revokeObjectURL(this.selectedImages[index].url);

    this.selectedImages.splice(index, 1);
  }

  // Toggle Amenities Selection
  toggleAmenity(amenity: string): void {

    if (this.selectedAmenities.includes(amenity)) {

      this.selectedAmenities =
        this.selectedAmenities.filter(item => item !== amenity);

    } else {

      this.selectedAmenities.push(amenity);

    }
  }

  // Toggle Available Days
  toggleDay(day: string): void {

    if (this.selectedDays.includes(day)) {

      this.selectedDays =
        this.selectedDays.filter(item => item !== day);

    } else {

      this.selectedDays.push(day);

    }
  }

  // Handle Form Submission
  onSubmit(): void {

    this.formSubmitted = true;

    // Frontend functionality only.
    // Backend submission and database integration
    // will be implemented in a later phase.

  }

  // Release Image Preview Resources
  ngOnDestroy(): void {

    this.selectedImages.forEach(image => {
      URL.revokeObjectURL(image.url);
    });

  }

}