import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ccxt from 'ccxt';

@Injectable()
export class MarketService {
  constructor(private config: ConfigService) {}

  test() {
    try {
      const exchange = new ccxt.binance()
      exchange.setSandboxMode(true)

      return {
        success:true
      };
    } catch (error) {
      console.log(error);

      return {
        error: JSON.stringify(error),
      };
    }
  }
}
