import { TradeItem } from './TradeItem';
import { User } from './User';

export interface Bid {
  bidId?: number;
  user: User;
  contract: TradeItem;
  bidState: string;
  bidPrice: number;
}
