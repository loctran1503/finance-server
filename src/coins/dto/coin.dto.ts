export interface BuyOrSellCoinDto {
  id: string;
  amount: number;
}

export interface CryptoCurrencyDetail{
    id:string;
    symbol:string;
    name:string;
    market_cap_rank:number;
    description:{
        en:string
    };
    market_data:{
        current_price:{
            usd:number
        }
        price_change_24h_in_currency:{
            usd:number
        }
        price_change_percentage_1h_in_currency:{
            usd:number
        }
        high_24h:{
            usd:number
        }
        low_24h:{
            usd:number
        },
        market_cap:{
            usd:number
        }
        total_volume:{
            usd:number
        }
        total_supply:number
       
        max_supply:number
        circulating_supply:number
    }
    links:{
        homepage:string[];
        blockchain_site:string[]
    }
  
    image:{
        large:string;
        small:string;
        thumb:string;
    }
}