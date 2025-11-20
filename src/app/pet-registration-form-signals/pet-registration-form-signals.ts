import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PetFormData {
  name: string;
  type: string;
  breed: string;
  age: number;
  weight?: number;
  color: string;
  birthDate: string;
  gender: string;
  observations?: string;
}

@Component({
  selector: 'app-pet-registration-form-signals',
  imports: [CommonModule],
  templateUrl: './pet-registration-form-signals.html',
})
export class PetRegistrationFormSignals {
  petTypes = ['Perro', 'Gato', 'Conejo', 'Ave', 'Hamster', 'Otro'];
  genders = ['Macho', 'Hembra'];
}
