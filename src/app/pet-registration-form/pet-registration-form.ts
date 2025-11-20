import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorIcon } from '../shared/icons/error-icon';

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
  selector: 'app-pet-registration-form',
  imports: [ReactiveFormsModule, CommonModule, ErrorIcon],
  templateUrl: './pet-registration-form.html',
})
export class PetRegistrationForm {
  private readonly formBuilder = inject(FormBuilder);
  readonly petTypes = ['Perro', 'Gato', 'Conejo', 'Ave', 'Hamster', 'Otro'];
  readonly genders = ['Macho', 'Hembra'];

  petForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    type: ['', Validators.required],
    breed: ['', [Validators.required, Validators.minLength(2)]],
    age: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
    weight: ['', [Validators.min(0)]],
    color: ['', Validators.required],
    birthDate: ['', Validators.required],
    gender: ['', Validators.required],
    observations: [''],
  });

  onSubmit(): void {
    if (this.petForm.valid) {
      const formData: PetFormData = this.petForm.value;
      console.log('Datos del formulario:', formData);
      // Aquí puedes agregar la lógica para enviar los datos al servidor
      alert('Mascota registrada exitosamente!');
      this.petForm.reset();
    } else {
      this.markFormGroupTouched(this.petForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.petForm.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength') && field?.touched) {
      return `Mínimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (field?.hasError('min') && field?.touched) {
      return `El valor mínimo es ${field.errors?.['min'].min}`;
    }
    if (field?.hasError('max') && field?.touched) {
      return `El valor máximo es ${field.errors?.['max'].max}`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.petForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
