import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  userForm: FormGroup;
  paymentForm: FormGroup;
  addressForm: FormGroup;
  user: User;
  registerationError: string;
  showPayAddressForm: boolean = false;
  hide = true;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      userType: ['buyer'],
      password: [null, Validators.required],
      confirmpassword: [
        null,
        [Validators.required, this.confirmPasswordValidator()],
      ],
    });

    this.paymentForm = this.formBuilder.group({
      cardNumber: [null, Validators.required],
      expiryDate: [null, Validators.required],
      cvv: [null, Validators.required],
    });

    this.addressForm = this.formBuilder.group({
      businessName: [null, Validators.required],
      registrationNumber: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      province: [null, Validators.required],
      zipCode: [null, Validators.required],
    });
  }

  registerUser() {
    const firstName = this.userForm.get('firstname').value;
    const lastName = this.userForm.get('lastname').value;
    const email = this.userForm.get('email').value;
    const userType = this.userForm.get('userType').value;
    const password = this.userForm.get('password').value;

    this.authService
      .registerUser({ email, password, userType, firstName, lastName })
      .subscribe(
        (obj) => {
          this.user = obj;
          this.showPayAddressForm = true;
          this.stepper.next();
        },
        (error: HttpErrorResponse) => {
          this.registerationError = error.error.message;
          this._snackBar.open(this.registerationError, 'Dismiss');
        }
      );
  }

  setAccountType(event: any) {
    this.userForm.get('userType').setValue(event.target.value);
  }

  saveAddress() {
    if (this.addressForm.valid) {
      const businessName = this.addressForm.get('businessName').value;
      const registration = this.addressForm.get('registrationNumber').value;
      const address = this.addressForm.get('address').value;
      const city = this.addressForm.get('city').value;
      const province = this.addressForm.get('province').value;
      const zipCode = this.addressForm.get('zipCode').value;

      const user = {
        email: this.user.email,
        addressDetails: {
          businessName,
          address,
          city,
          province,
          registration,
          zipCode,
        },
      };

      this.userService.saveAddress(user).subscribe((obj) => {});
    }
  }

  savePayment() {
    setTimeout(() => {
      this.router.navigate(['../login']);
    }, 2500);
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.userForm) {
        if (control.value !== this.userForm.get('password').value) {
          return { ifPasswordDifferent: true };
        }
        return null;
      }
      return null;
    };
  }
}
