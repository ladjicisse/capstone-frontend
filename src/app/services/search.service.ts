import { Injectable, signal } from '@angular/core';
import {debounceTime, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  public query = signal('');

  private searchInput = new Subject<string>();

  constructor() {
    this.searchInput.pipe(
      debounceTime(300)
    ).subscribe(query => this.query.set(query));
  }

  update(value: string) {
    this.searchInput.next(value);
  }
}
