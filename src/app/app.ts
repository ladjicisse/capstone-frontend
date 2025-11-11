import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EnvService} from './services/env.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('capstone-frontend');
  private envService = inject(EnvService);

  ngOnInit(): void {
    this.envService.logConfig();
  }
}
