import { Routes } from '@angular/router';
import { DynamicSkillForm } from './dynamic-skill-form/dynamic-skill-form';
import { PetRegistrationFormSignals } from './pet-registration-form-signals/pet-registration-form-signals';
import { PetRegistrationForm } from './pet-registration-form/pet-registration-form';
import { ProductReviewForm } from './product-review-form/product-review-form';
import { TournamentRegistration } from './tournament-registration/tournament-registration';

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
    path: 'tournament-registration',
    component: TournamentRegistration,
  },
  {
    path: 'dynamic-skill-form',
    component: DynamicSkillForm,
  },
  {
    path: '',
    redirectTo: '/reactive-form',
    pathMatch: 'full',
  },
];
