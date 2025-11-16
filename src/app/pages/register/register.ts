import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsersService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  displayName = '';
  email = '';
  password = '';

  success = false;
  error: string | null = null;

  constructor(private usersService: UsersService) {}

  async register() {
    this.success = false;
    this.error = null;

    try {
      await this.usersService.createUser({
        displayName: this.displayName,
        mailNickname: this.email.split('@')[0],
        userPrincipalName: this.email,
        password: this.password
      });

      this.success = true;
      this.displayName = '';
      this.email = '';
      this.password = '';

    } catch (err: any) {
      this.error = 'Error: ' + err.error?.error?.message || 'Error creating user.';
    }
  }
}
