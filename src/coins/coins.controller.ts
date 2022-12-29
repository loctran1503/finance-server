import { Controller,Post, UseGuards,Req,Body } from "@nestjs/common";
import { Request } from "express";
import { JwtGuard } from "../users/guard";
import { CoinsService } from "./coins.service";
import { BuyOrSellCoinDto } from "./dto";


@Controller('coins')

export class CoinsController{
    constructor(private service : CoinsService){}

  
    @Post('convert-usd-to-usdt')
    @UseGuards(JwtGuard)
    convertUsdToUsdt(@Req() request : Request,@Body('amount') amount : number){
   
        
          
            
        return this.service.convertUsdToUsdt(request,amount)
    }
    @Post('convert-usdt-to-usd')
    @UseGuards(JwtGuard)
    convertUsdtToUsd(@Req() request : Request,@Body('amount') amount : number){
            
        return this.service.convertUsdtToUsd(request,amount)
    }

    @Post('buy')
    @UseGuards(JwtGuard)
    buy(@Req() request : Request,@Body('coin') coin : BuyOrSellCoinDto){
    
        
            
            
        return this.service.buy(request,coin)
    }

    @Post('sell')
    @UseGuards(JwtGuard)
    sell(@Req() request : Request,@Body('coin') coin : BuyOrSellCoinDto){

        
            
            
        return this.service.sell(request,coin)
    }

  
}