import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<{
    coin: string;
    days: number;
  }>({
    coin: 'bitcoin',
    days: 7
  });

  filter$ = this.filterSubject.asObservable();

  updateFilter(coin: string, days: number) {
    this.filterSubject.next({ coin, days });
  }
}
