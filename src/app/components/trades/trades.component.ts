import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradeItem } from 'src/app/models/TradeItem';
import { TradingService } from 'src/app/services/trading.service';
import {
  faSortAlphaUp,
  faSortAlphaDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css'],
})
export class TradesComponent implements OnInit {
  userType: string = '';
  selectedItem: TradeItem;
  searchTerm: string;
  tradingItems: TradeItem[];
  allTradingItems: TradeItem[];
  loading = false;
  isAscending: boolean = true;
  loadingProgress: number = 0;
  asc = faSortAlphaDown;
  desc = faSortAlphaUp;

  constructor(
    private route: ActivatedRoute,
    private tradingService: TradingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.userType = params['userType'];
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.tradingService.getContracts().subscribe((contracts) => {
      this.allTradingItems = contracts;
      this.processContracts();
      this.loading = false;
    });
  }

  processContracts() {
    this.tradingItems = [...this.allTradingItems];
  }

  sortTradingItems() {
    this.isAscending
      ? this.tradingItems.sort((a, b) => a.name.localeCompare(b.name))
      : this.tradingItems.sort((a, b) => b.name.localeCompare(a.name));
  }

  performSearch() {
    if (this.searchTerm) {
      this.tradingItems = this.allTradingItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.sortTradingItems();
    } else {
      this.tradingItems = [...this.allTradingItems];
      this.sortTradingItems();
    }
  }

  setSelectedTradeItem(tradeItem: TradeItem) {
    this.selectedItem = tradeItem;
  }
}
