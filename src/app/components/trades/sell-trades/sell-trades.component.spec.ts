import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTradesComponent } from './sell-trades.component';

describe('SellTradesComponent', () => {
  let component: SellTradesComponent;
  let fixture: ComponentFixture<SellTradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellTradesComponent]
    });
    fixture = TestBed.createComponent(SellTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
