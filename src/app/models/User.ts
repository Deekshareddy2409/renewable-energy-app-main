import { AddressDetails } from './AddressDetails';

export interface User {
  email?: string;
  password?: string;
  userType?: string;
  firstName?: string;
  lastName?: string;
  addressDetails?: AddressDetails;
}
