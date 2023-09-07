import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Bid } from 'src/app/models/Bid';
import { TradeItem } from 'src/app/models/TradeItem';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-trade-item-desc',
  templateUrl: './trade-item-desc.component.html',
  styleUrls: ['./trade-item-desc.component.css'],
})
export class TradeItemDescComponent implements OnInit {
  @Input() selectedItem: TradeItem;
  bidValue: number = 0;
  loggedInUser: User = {};
  private isLoggedInSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private bidService: BidService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }
    );
  }

  sendBid() {
    const bid: Bid = {
      user: this.loggedInUser,
      contract: this.selectedItem,
      bidState: 'pending',
      bidPrice: this.bidValue,
    };
    this.bidService.createBid(bid).subscribe((obj) => {
      this._snackBar.open(obj.data, 'Dismiss');
    });
  }
}
