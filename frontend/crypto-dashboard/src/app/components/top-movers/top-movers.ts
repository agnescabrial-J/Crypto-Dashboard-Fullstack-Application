import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { CryptoService } from '../../services/crypto';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-top-movers',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './top-movers.html'
})
export class TopMoversComponent implements OnInit, OnDestroy {

  gainer: any;
  loser: any;

  private sub!: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.sub = this.filterService.filter$.subscribe(() => {
      console.log("test top movers");
      
      this.loadMovers();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private loadMovers(): void {
    this.cryptoService.getTopGainer().subscribe(data => {
      this.gainer = {
        ...data,
        changePercent: this.calcPercent(data.high_24h, data.current_price)
      };
    });

    this.cryptoService.getTopLoser().subscribe(data => {
      this.loser = {
        ...data,
        changePercent: this.calcPercent(data.low_24h, data.current_price)
      };
    });
  }

  private calcPercent(a: number, b: number): number {
    if (!a || !b) return 0;
    return ((a - b) / b) * 100;
  }
}
