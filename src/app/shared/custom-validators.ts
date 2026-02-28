import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static gamertag(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const gamertagPattern = /^[a-zA-Z0-9_]{3,20}$/;

    if (!gamertagPattern.test(value)) {
      return {
        gamertag: {
          message: 'Gamertag must be 3-20 characters (letters, numbers, underscores only) 🎮',
        },
      };
    }
    return null;
  }

  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    const isLongEnough = value.length >= 8;

    const passwordValid = hasNumber && hasUpper && hasLower && hasSpecial && isLongEnough;

    if (!passwordValid) {
      return {
        strongPassword: {
          hasNumber,
          hasUpper,
          hasLower,
          hasSpecial,
          isLongEnough,
          message: 'Password must be strong! 🔒',
        },
      };
    }

    return null;
  }

  static emailDomain(allowedDomains: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (!email) return null;

      const domain = email.split('@')[1];
      if (domain && !allowedDomains.includes(domain)) {
        return {
          emailDomain: {
            allowedDomains,
            actualDomain: domain,
            message: `Email must be from approved domains: ${allowedDomains.join(', ')} 📧`,
          },
        };
      }

      return null;
    };
  }
}
