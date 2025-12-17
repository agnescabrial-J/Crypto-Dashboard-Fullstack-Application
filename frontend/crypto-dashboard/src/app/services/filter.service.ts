import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface FilterState {
  coin: string;
  days: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new BehaviorSubject<FilterState>({
    coin: 'bitcoin',
    days: 7
  });

  filter$ = this.filterSubject.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged(
      (a, b) => a.coin === b.coin && a.days === b.days
    )
  );

  updateFilter(coin: string, days: number): void {
    console.log("test filter service");
    
    this.filterSubject.next({ coin, days });
  }

  get current() {
    return this.filterSubject.value;
  }
}
