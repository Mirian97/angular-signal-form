import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Field,
  form,
  max,
  min,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { ErrorIcon } from '../shared/icons/error-icon';

interface PetFormData {
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  birthDate: string;
  gender: string;
  observations: string;
}

@Component({
  selector: 'app-pet-registration-form-signals',
  imports: [CommonModule, Field, ErrorIcon],
  templateUrl: './pet-registration-form-signals.html',
})
export class PetRegistrationFormSignals {
  petTypes = ['perro', 'gato', 'conejo', 'ave', 'hamster', 'otro'];
  genders = ['Macho', 'Hembra'];

  petModel = signal<PetFormData>({
    name: '',
    type: '',
    breed: '',
    age: 0,
    weight: 0,
    color: '',
    birthDate: '',
    gender: '',
    observations: '',
  });

  petForm = form(this.petModel, (path) => {
    required(path.name, { message: 'El nombre es requerido' });
    minLength(path.name, 2, { message: 'El nombre debe tener al menos 2 caracteres' });
    // minLength(path.name, 3, { message: 'El nombre debe tener al menos 3 caracteres' });

    required(path.type, { message: 'El tipo es requerido' });
    required(path.breed, { message: 'La raza es requerida' });
    minLength(path.breed, 2, { message: 'La raza debe tener al menos 2 caracteres' });

    required(path.gender, { message: 'El género es requerido' });
    required(path.color, { message: 'El color es requerido' });

    required(path.birthDate, { message: 'La fecha de nacimiento es requerida' });

    min(path.age, 0, { message: 'La edad debe ser mayor a 0' });
    max(path.age, 30, { message: 'La edad debe ser menor a 30' });

    min(path.weight, 0, { message: 'El peso debe ser mayor a 0' });
    max(path.weight, 100, { message: 'El peso debe ser menor a 100 kg' });

    validate(path.type, ({ value }) => {
      if (value() === 'otro') {
        return {
          message: 'El tipo de mascota no puede ser "otro"',
          kind: 'error',
        };
      }
      return null;
    });

    // No puede ser mayor a hoy
    validate(path.birthDate, ({ value }) => {
      if (!value) return null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const birthDate = new Date(value());
      birthDate.setHours(0, 0, 0, 0);

      if (birthDate >= today) {
        return {
          message: 'La fecha de nacimiento no puede ser mayor a hoy',
          kind: 'error',
        };
      }

      return null;
    });
  });

  isFieldInvalid(fieldName: keyof PetFormData): boolean {
    const fieldSignal = this.petForm[fieldName]; // this.petForm.name() // age()
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.petForm, async () => {
      console.log('Formulario enviado');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.onReset();
    });

    console.log({
      model: this.petModel(),
      form: this.petForm().value(),
      valid: this.petForm().valid(),
      invalid: this.petForm().invalid(),
      nameErrors: this.petForm.name().errors(),
    });
  }

  onReset() {
    this.petModel.set({
      name: '',
      type: '',
      breed: '',
      age: 0,
      weight: 0,
      color: '',
      birthDate: '',
      gender: '',
      observations: '',
    });

    this.petForm().reset();
  }
}
