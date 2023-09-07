import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TradeItem } from 'src/app/models/TradeItem';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { TradingService } from 'src/app/services/trading.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  MatChipListbox,
  MatChipListboxChange,
  MatChipOption,
} from '@angular/material/chips';
import { BidService } from 'src/app/services/bid.service';
import { Bid } from 'src/app/models/Bid';

@Component({
  selector: 'app-sell-trades',
  templateUrl: './sell-trades.component.html',
  styleUrls: ['./sell-trades.component.css'],
})
export class SellTradesComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) sellTradesFormDirective!: FormGroupDirective;
  @ViewChild('chipBox') chipListbox!: MatChipListbox;
  sellTrades: FormGroup;
  fileToUpload: File;
  imageBase: string;
  activeTab: string = 'my-contracts';
  private isLoggedInSubscription: Subscription;
  loggedInUser: User;
  error: string = '';
  trash = faTrash;
  myContracts: TradeItem[];
  filteredBids: Array<Bid> = [];
  bids: Array<Bid> = [];

  constructor(
    private tradingService: TradingService,
    private authService: AuthService,
    private bidService: BidService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }
    );

    this.loadMyContracts();

    this.sellTrades = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      numOfContracts: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required),
    });
  }

  loadMyContracts() {
    this.tradingService
      .getContractsByPublisher(this.loggedInUser.email)
      .subscribe((contracts) => {
        this.myContracts = contracts;
      });
  }

  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      this.imageBase = event.target.result as string;
    };
    fileReader.readAsDataURL(this.fileToUpload);
  }

  filterBids(event: MatChipListboxChange) {
    if (event.value === undefined || event.value.includes('all')) {
      this.filteredBids = this.bids;
    } else {
      this.filteredBids = this.bids.filter((bid) =>
        event.value.includes(bid.bidState)
      );
    }
  }

  getNumOfBidsInCategory(category: string) {
    return this.bids.filter((bid) => bid.bidState === category).length;
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'My Contracts') {
      this.loadMyContracts();
    }
    if (event.tab.textLabel === 'Bid Requests') {
      this.loadBids();
    }
  }

  loadBids() {
    this.bidService
      .getBidsForSeller(this.loggedInUser.email)
      .subscribe((data) => (this.bids = this.filteredBids = data));
  }

  manageBidRequests(id: number, action: string) {
    const selectedOption = this.chipListbox.selected as MatChipOption;

    this.bidService
      .changeBidState(id, action)
      .subscribe((bids) => (this.bids = this.filteredBids = bids));

    this._snackBar.open('Bid ' + action, 'dismiss');
  }

  createContract() {
    const contractData: TradeItem = {
      name: this.sellTrades.get('name').value,
      description: this.sellTrades.get('description').value,
      price: this.sellTrades.get('price').value,
      numOfContracts: this.sellTrades.get('numOfContracts').value,
      fileName: this.fileToUpload.name,
      image: this.imageBase,
      publisherEmail: this.loggedInUser.email,
      bidPrices: [],
    };

    this.tradingService.createContract(contractData).subscribe(
      (response) => {
        this._snackBar.open(response['data'], 'Dismiss');
        this.sellTradesFormDirective.resetForm();
      },
      (error) => {
        this.error = error.errorMessage;
      }
    );
  }

  deleteContract(id: number) {
    this.tradingService.deleteContract(id).subscribe((items) => {
      this.myContracts = items;
      this._snackBar.open('Contract Deleted Successfully', 'Dismiss');
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
