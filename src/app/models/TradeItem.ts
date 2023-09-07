import { Bid } from './Bid';

export interface TradeItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  numOfContracts: number;
  fileName: string;
  image: string;
  publisherEmail: string;
  bidPrices: Array<Bid>;
}
