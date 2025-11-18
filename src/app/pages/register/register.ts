import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  registerForm: FormGroup;

  success = false;
  error: string | null = null;
  userPrincipalName = '';

  private readonly entraIdPrincipalName = 'ladjicisseprogmail.onmicrosoft.com';

  constructor(private usersService: UserService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.matchPasswords('password', 'confirmPassword')
    });
  }

  // Match Passwords
  matchPasswords(password: string, confirmPassword: string) {
    return (form: AbstractControl): ValidationErrors | null => {
      const pass = form.get(password)?.value;
      const confirm = form.get(confirmPassword)?.value;

      if (pass !== confirm) {
        form.get(confirmPassword)?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      return null;
    }
  }

  // Password strength (uppercase, digit, special char)
  passwordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return null;

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasNumber = /[0-9]+/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]+/.test(value);

      const valid = hasUpperCase && hasNumber && hasSpecial;

      return valid ? null : { weakPassword: true };
    };
  }

  async register() {
    this.success = false;
    this.error = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log("Registration form values:", this.registerForm.value);

    const mailNickname = this.email?.value.split('@')[0];
    this.userPrincipalName = `${mailNickname}@${this.entraIdPrincipalName}`;

    try {
      await this.usersService.createUser({
        displayName: `${this.firstname?.value} ${this.lastname?.value}`,
        mailNickname: mailNickname,
        givenName: this.firstname?.value,
        surname: this.lastname?.value,
        userPrincipalName: this.userPrincipalName,
        password: this.password?.value
      });

      this.success = true;

      this.registerForm.reset();

    } catch (err: any) {
      this.error = 'Error: ' + err.error?.error?.message || 'Error creating user.';
    }
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}
