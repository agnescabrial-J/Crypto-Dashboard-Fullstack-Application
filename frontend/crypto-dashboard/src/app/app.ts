import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketChartComponent } from './components/market-chart/market-chart';
import { TopMoversComponent } from './components/top-movers/top-movers';

@Component({
  selector: 'app-root',
  standalone: true,                // ✅ THIS WAS MISSING
  imports: [RouterOutlet, MarketChartComponent, TopMoversComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crypto-dashboard');
}
