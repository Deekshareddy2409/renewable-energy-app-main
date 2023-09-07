import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeItemDescComponent } from './trade-item-desc.component';

describe('TradeItemDescComponent', () => {
  let component: TradeItemDescComponent;
  let fixture: ComponentFixture<TradeItemDescComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeItemDescComponent]
    });
    fixture = TestBed.createComponent(TradeItemDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
