import { Routes } from '@angular/router';
import { PetRegistrationForm } from './pet-registration-form/pet-registration-form';
import { PetRegistrationFormSignals } from './pet-registration-form-signals/pet-registration-form-signals';

export const routes: Routes = [
  {
    path: 'reactive-form',
    component: PetRegistrationForm,
  },
  {
    path: 'signals-form',
    component: PetRegistrationFormSignals,
  },
  {
    path: '',
    redirectTo: '/reactive-form',
    pathMatch: 'full',
  },
];
