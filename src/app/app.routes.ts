import { Routes } from '@angular/router';
import { PetRegistrationFormSignals } from './pet-registration-form-signals/pet-registration-form-signals';
import { PetRegistrationForm } from './pet-registration-form/pet-registration-form';
import { ProductReviewForm } from './product-review-form/product-review-form';

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
    path: 'product-review-form',
    component: ProductReviewForm,
  },
  {
    path: '',
    redirectTo: '/reactive-form',
    pathMatch: 'full',
  },
];
