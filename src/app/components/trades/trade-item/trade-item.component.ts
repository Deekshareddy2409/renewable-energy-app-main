import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TradeItem } from 'src/app/models/TradeItem';
import { single } from './data';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { Bid } from 'src/app/models/Bid';
@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.css'],
})
export class TradeItemComponent implements OnInit {
  @Input() tradeItem: TradeItem;
  bidPrices: Array<Bid>;
  graphData: any[];
  single: any[] = [];
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel: 'Bids';
  showYAxisLabel = true;
  yAxisLabel: 'Bid Price';
  graphDataChart: any[];
  @Output() selectedItemEmitter: EventEmitter<TradeItem> =
    new EventEmitter<TradeItem>();

  constructor(private sanitizer: DomSanitizer) {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.bidPrices = this.tradeItem.bidPrices.filter(
      (bids) => bids.bidState === 'accepted'
    );
    this.graphData = this.bidPrices.map((bid) => ({
      name: bid.bidId.toString(),
      value: bid.bidPrice,
    }));

    this.single = [
      {
        name: 'Bid Prices',
        series: this.bidPrices.map((bid) => ({
          name: bid.bidId.toString(),
          value: bid.bidPrice,
        })),
      },
    ];
  }

  viewTradeItem(tradeItem: TradeItem) {
    this.selectedItemEmitter.emit(tradeItem);
  }
}
