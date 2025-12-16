import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';

import { CryptoService } from '../../services/crypto';

@Component({
  selector: 'app-top-movers',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './top-movers.html'
})
export class TopMoversComponent implements OnInit {

  gainer: any;
  loser: any;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.loadMovers();
  }

  loadMovers(): void {
    this.cryptoService.getTopGainer().subscribe((data: any) => {
      this.gainer = data;
    });

    this.cryptoService.getTopLoser().subscribe((data: any) => {
      this.loser = data;
    });
  }
}
