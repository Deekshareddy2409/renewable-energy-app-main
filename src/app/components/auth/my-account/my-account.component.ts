import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressDetails } from 'src/app/models/AddressDetails';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  paymentForm: FormGroup;
  activeTab: string = 'address';
  edit = false;
  loading = true;
  loggedInUser: User;
  addressDetails: AddressDetails;
  private isLoggedInSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }
    );

    this.userService
      .getAddressDetailsForUser(this.loggedInUser['email'])
      .subscribe((obj: AddressDetails) => {
        this.addressDetails = obj;
        this.loading = false;
        this.initializeAddressForm(this.addressDetails);
      });

    this.paymentForm = this.formBuilder.group({
      cardNumber: [null, Validators.required],
      expiryDate: [null, Validators.required],
      cvv: [null, Validators.required],
    });
  }

  initializeAddressForm(addressDetails: AddressDetails) {
    this.addressForm = this.formBuilder.group({
      businessName: [
        addressDetails ? addressDetails.businessName : null,
        Validators.required,
      ],
      registrationNumber: [
        addressDetails ? addressDetails.registration : null,
        Validators.required,
      ],
      address: [
        addressDetails ? addressDetails.address : null,
        Validators.required,
      ],
      city: [addressDetails ? addressDetails.city : null, Validators.required],
      province: [
        addressDetails ? addressDetails.province : null,
        Validators.required,
      ],
      zipCode: [
        addressDetails ? addressDetails.zipCode : null,
        Validators.required,
      ],
    });

    this.edit = addressDetails ? false : true;
  }

  saveAddress() {
    if (this.addressForm.valid) {
      const businessName = this.addressForm.get('businessName').value;
      const registration = this.addressForm.get('registrationNumber').value;
      const address = this.addressForm.get('address').value;
      const city = this.addressForm.get('city').value;
      const province = this.addressForm.get('province').value;
      const zipCode = this.addressForm.get('zipCode').value;

      this.loggedInUser['addressDetails'] = {
        addressId: this.addressDetails.addressId,
        businessName,
        address,
        city,
        province,
        registration,
        zipCode,
      };

      this.userService.saveAddress(this.loggedInUser).subscribe((obj) => {
        this.edit = false;
      });
    }
  }

  savePayment() {
    if (this.paymentForm.valid) {
      alert('Payment details saved successfully!');
    }
  }

  ngOnDestroy() {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }
}
