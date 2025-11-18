import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {AsyncPipe} from '@angular/common';
import {BasketStore} from './store/basket.store';
import {FormsModule} from '@angular/forms';
import {SearchService} from './services/search.service';
import {MsalService} from '@azure/msal-angular';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AsyncPipe, FormsModule, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('biojus');
  private authService = inject(AuthService);
  private searchService = inject(SearchService);
  protected basketStore = inject(BasketStore);
  private msalService = inject(MsalService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected searchTerm = computed(() => this.searchService.query());

  protected basketItemsCount = computed(() => this.basketStore.itemsCount());

  protected readonly currentAccount$ = this.authService.getCurrentAccount$();

  protected hideSearch = false;

  // async ngOnInit() {
  //
  //   // THis is a safety check to ensure MSAL is initialized before handling redirects
  //   await this.msalService.instance.initialize(); // ✅ safety call
  //   const result = await this.msalService.instance.handleRedirectPromise();
  //   if (result && result.account) {
  //     this.msalService.instance.setActiveAccount(result.account);
  //   }
  //   //....
  //
  //   this.currentAccount$.subscribe(account => {
  //     console.log('Current Account:', account?.name);
  //   });
  // }

  ngOnInit() {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result !== null) {
          this.msalService.instance.setActiveAccount(result.account);
        }
      },
      error: (error) => console.log(error)
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const child = this.activatedRoute.firstChild;
      this.hideSearch = child?.snapshot.data['hideSearch'] ?? false;
    })
  }

  onSearch(event: any) {
    this.searchService.update(event.target.value);
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
