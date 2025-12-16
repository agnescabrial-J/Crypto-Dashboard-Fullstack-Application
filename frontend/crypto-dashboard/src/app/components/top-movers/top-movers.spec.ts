import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMovers } from './top-movers';

describe('TopMovers', () => {
  let component: TopMovers;
  let fixture: ComponentFixture<TopMovers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMovers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMovers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
