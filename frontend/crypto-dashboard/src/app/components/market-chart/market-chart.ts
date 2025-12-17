import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { Subscription, interval } from 'rxjs';

import { CryptoService } from '../../services/crypto';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './market-chart.html'
})
export class MarketChartComponent implements OnInit, OnDestroy {

  selectedCoin = 'bitcoin';
  days = 7;
  chart?: Chart;

  private sub = new Subscription();

  constructor(
    private cryptoService: CryptoService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.filterService.filter$.subscribe(filter => {
        this.selectedCoin = filter.coin;
        this.days = filter.days;
        this.loadChart(filter.coin, filter.days);
      })
    );

    this.sub.add(
      interval(60000).subscribe(() => {
        const f = this.filterService.current;
        this.loadChart(f.coin, f.days);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.chart?.destroy();
  }

  // 🔥 PUBLIC METHODS FOR TEMPLATE
  onCoinChange(): void {
    this.filterService.updateFilter(this.selectedCoin, this.days);
  }

  onDaysChange(d: number): void {
    this.days = d;
    this.filterService.updateFilter(this.selectedCoin, d);
  }

  // 🔒 PRIVATE INTERNAL METHOD
  private loadChart(coin: string, days: number): void {
    this.cryptoService.getMarketChart(coin, days).subscribe(data => {
      if (!data?.prices) return;

      const labels = data.prices.map((p: any[]) =>
        new Date(p[0]).toLocaleDateString()
      );
      const prices = data.prices.map((p: any[]) => p[1]);

      this.chart?.destroy();

      this.chart = new Chart('priceChart', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: prices,
            borderColor: '#4f8cff',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    });
  }
}
