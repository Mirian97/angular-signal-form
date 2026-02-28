import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface JobApplication {
  name: string;
  email: string;
  phone: string;
  workExperience: WorkExperience[];
  education: Education[];
  resume: File | null;
  skills: string;
  coverLetter: string;
  availability: string | null;
  salary: number | null;
  terms: boolean;
  privacy: boolean;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
}

export interface Education {
  institution: string;
  degree: string;
}

@Component({
  selector: 'app-register-curriculum',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register-curriculum.html',
})
export class RegisterCurriculum {
  private readonly formBuilder = inject(FormBuilder);

  workItemForm = this.formBuilder.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    startDate: [null, Validators.required],
    endDate: [null],
  });

  educationItemForm = this.formBuilder.group({
    institution: ['', Validators.required],
    degree: ['', Validators.required],
  });

  applicationForm = this.formBuilder.group({
    name: ['', Validators.required, Validators.minLength(3)],
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required, Validators.minLength(8)],
    workExperience: this.formBuilder.array([this.workItemForm]),
    education: this.formBuilder.array([this.educationItemForm]),
    resume: ['', Validators.required],
    skills: [''],
    coverLetter: [''],
    availability: [''],
    salary: [, Validators.min(0)],
    terms: [false, Validators.requiredTrue],
    privacy: [false, Validators.requiredTrue],
  });

  get workArray() {
    return this.applicationForm.get('workExperience') as FormArray;
  }

  get educationArray() {
    return this.applicationForm.get('education') as FormArray;
  }

  addWorkExperience() {
    this.workArray.push(this.workItemForm);
  }

  removeWorkExperience(index: number) {
    this.workArray.removeAt(index);
  }

  addEducation() {
    this.educationArray.push(this.educationItemForm);
  }

  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.applicationForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

  getClassInput(isInvalid: boolean) {
    return isInvalid
      ? 'w-full px-4 py-3 border-2 border-red-500 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-900 cursor-pointer'
      : 'w-full px-4 py-3 border-2 border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 cursor-pointer';
  }

  onSubmit(event: Event) {}
}
