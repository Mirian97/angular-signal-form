import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetRegistrationForm } from './pet-registration-form/pet-registration-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PetRegistrationForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-21');
}
