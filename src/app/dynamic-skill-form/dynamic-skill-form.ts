import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

interface Skill {
  name: string;
  level: number;
  yearsOfExperience: number;
}

@Component({
  selector: 'app-dynamic-skill-form',
  imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule],
  templateUrl: './dynamic-skill-form.html',
  styleUrl: './dynamic-skill-form.css',
})
export class DynamicSkillForm {
  private formBuilder = inject(FormBuilder);

  skillsForm = this.formBuilder.group({
    skills: this.formBuilder.array([]),
  });

  get skillsArray() {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      level: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      yearsOfExperience: [0, [Validators.required, Validators.min(0)]],
    });
    this.skillsArray.push(skillGroup);
  }

  removeSkill(index: number) {
    if (this.skillsArray.length > 1) {
      this.skillsArray.removeAt(index);
      console.log('🗑️ Removed skill at index', index);
    }
  }

  saveSkills() {
    if (this.skillsForm.valid) {
      const skills = this.skillsForm.value.skills;
      console.log('💾 Saving skills portfolio:', skills);
    }
  }
}
