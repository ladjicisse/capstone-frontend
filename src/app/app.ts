import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {AsyncPipe} from '@angular/common';
import {BasketStore} from './store/basket.store';
import {FormsModule} from '@angular/forms';
import {SearchService} from './services/search.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AsyncPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('biojus');
  private authService = inject(AuthService);
  private searchService = inject(SearchService);
  protected basketStore = inject(BasketStore);

  protected searchTerm = computed(() => this.searchService.query());

  protected basketItemsCount = computed(() => this.basketStore.itemsCount());

  protected readonly currentAccount$ = this.authService.getCurrentAccount$();

  async ngOnInit() {
    this.currentAccount$.subscribe(account => {
      console.log('Current Account:', account?.name);
    });
  }

  onSearch(event: any) {
    this.searchService.query.set(event.target.value);
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
