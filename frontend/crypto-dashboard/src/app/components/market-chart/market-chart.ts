import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './market-chart.html'
})
export class MarketChartComponent implements OnInit, OnDestroy {
  chart: Chart | undefined;
  selectedCoin = 'bitcoin';
  days = 7;

  private intervalId: any;

  constructor(
    private cryptoService: CryptoService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.loadChart();
    this.intervalId = setInterval(() => {
      console.log('🔄 Fetching market chart data...');
      this.loadChart();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); 
  }

  loadChart() {
    // Update filters if needed
    this.filterService.updateFilter(this.selectedCoin, this.days);
    console.log("Tested passed");
    
    this.cryptoService.getMarketChart(this.selectedCoin, this.days)
      .subscribe((data: any) => {
        if (!data?.prices) return;

        const prices = data.prices.map((p: any[]) => p[1]);
        const labels = data.prices.map((p: any[]) =>
          new Date(p[0]).toLocaleDateString()
        );

        if (this.chart) this.chart.destroy();

        this.chart = new Chart('priceChart', {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Price',
                data: prices,
                borderColor: '#4f8cff',
                backgroundColor: 'rgba(79,140,255,0.15)',
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      });
  }
}
