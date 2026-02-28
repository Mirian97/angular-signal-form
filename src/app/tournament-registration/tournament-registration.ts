import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';

interface TournamentPlayer {
  gamertag: string;
  email: string;
  favoriteGame: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  teamName?: string;
  discordHandle?: string;
  age: number;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-tournament-registration',
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './tournament-registration.html',
  styleUrl: './tournament-registration.css',
})
export class TournamentRegistration {
  private formBuilder = inject(FormBuilder);

  playerForm = this.formBuilder.group({
    gamertag: ['', Validators.required, Validators.minLength(3)],
    email: ['', Validators.required, Validators.email],
    favoriteGame: ['', Validators.required],
    skillLevel: ['', Validators.required],
    teamName: [''],
    discordHandle: [''],
    age: ['', Validators.required, Validators.minLength(3)],
    acceptTerms: [false, Validators.requiredTrue],
  });

  gameOptions = [
    { label: 'Valorant 🔫', value: 'valorant' },
    { label: 'League of Legends ⚔️', value: 'lol' },
    { label: 'Fortnite 🏗️', value: 'fortnite' },
    { label: 'Counter-Strike 2 💥', value: 'cs2' },
    { label: 'Rocket League ⚽', value: 'rocket-league' },
    { label: 'Overwatch 2 🦸', value: 'overwatch' },
  ];

  registerPlayer() {}

  getGameEmoji(): string {
    const game = this.playerForm.get('favoriteGame')?.value;
    const gameEmojis: { [key: string]: string } = {
      valorant: '🔫',
      lol: '⚔️',
      fortnite: '🏗️',
      cs2: '💥',
      'rocket-league': '⚽',
      overwatch: '🦸',
    };
    return game ? gameEmojis[game] : '🎮';
  }

  getSkillEmoji(): string {
    const skill = this.playerForm.get('skillLevel')?.value;
    const skillEmojis: { [key: string]: string } = {
      beginner: '🌱',
      intermediate: '⚡',
      advanced: '🔥',
      pro: '👑',
    };
    return skill ? skillEmojis[skill] : '🎮';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.playerForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
