import { Routes } from '@angular/router';
import { PetRegistrationForm } from './pet-registration-form/pet-registration-form';

export const routes: Routes = [
  {
    path: 'reactive-form',
    component: PetRegistrationForm,
  },
  {
    path: '',
    redirectTo: '/reactive-form',
    pathMatch: 'full',
  },
];
