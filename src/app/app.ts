import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('biojus');
  private authService = inject(AuthService);

  protected readonly currentAccount$ = this.authService.getCurrentAccount$();

  async ngOnInit() {
    this.currentAccount$.subscribe(account => {
      console.log('Current Account:', account?.name);
    })
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
