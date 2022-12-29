import { Injectable, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../users/guard';
import { DataSource } from 'typeorm';
import { BuyOrSellCoinDto, CryptoCurrencyDetail } from './dto';
import { Request } from 'express';
import { UserResponse } from '../users/dto';
import { AuthenticationError } from 'ccxt';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserCoin } from './entities/coin.entity';
import axios from 'axios';
import { cryptoDetailUrl } from 'src/utils/constants';
import { UserEvent } from './entities/event.entity';
import { decimalConverterWithoutCurrency } from 'src/utils/function/decimal';

@Injectable()
export class CoinsService {
  constructor(
    private readonly dataSource: DataSource,
    private jwt: JwtService,
  ) {}

  //Convert to USDT
  async convertUsdToUsdt(
    request: Request,
    amount: number,
  ): Promise<UserResponse> {
    return await this.dataSource.transaction(async (transactionManager) => {
      try {
        if (!request.user) throw new UnauthorizedException('user not found');
        const user: User = request.user as User;
        if (user.usd < amount)
          return {
            code: 400,
            success: false,
            message: 'Usd not enough to convert',
          };

        user.usd -= amount;
        user.usdt += amount;
        await transactionManager.getRepository(User).save(user);

        const newEvent =  transactionManager.getRepository(UserEvent).create({
          porfolio:user.usd+user.usdt,
          description:`Convert $${decimalConverterWithoutCurrency(amount)} to ${decimalConverterWithoutCurrency(amount)} USDT`,
          user
        })
        await transactionManager.getRepository(UserEvent).save(newEvent)

        const userSaved = await transactionManager.getRepository(User).findOne({
          where:{
            userId:user.userId
          },
          order:{
            events:{
              createdAt:'ASC'
            }
          },
          relations:{
            coins:true,
            events:true
          }
        })

        

        return {
          code: 200,
          success: true,
          message: 'convert usd to usdt successfully',
          user:userSaved,
        };
      } catch (error) {
        console.log('convert use to usdt error');
        console.log(error);

        return {
          code: 500,
          success: false,
          message: `convert usd to usdt error:${JSON.stringify(error)}`,
        };
      }
    });
  }
  //Convert To USD
  async convertUsdtToUsd(
    request: Request,
    amount: number,
  ): Promise<UserResponse> {
    return await this.dataSource.transaction(async (transactionManager) => {
      try {
        if (!request.user) throw new UnauthorizedException('user not found');
        const user: User = request.user as User;
        if (user.usdt < amount)
          return {
            code: 400,
            success: false,
            message: 'Usdt not enough to convert',
          };

        user.usdt -= amount;
        user.usd += amount;

        await transactionManager.getRepository(User).save(user);

        const newEvent =  transactionManager.getRepository(UserEvent).create({
          porfolio:user.usd+user.usdt,
          description:`Convert ${decimalConverterWithoutCurrency(amount)} USDT to $${decimalConverterWithoutCurrency(amount)}`,
          user
        })
        await transactionManager.getRepository(UserEvent).save(newEvent)

        const userSaved = await transactionManager.getRepository(User).findOne({
          where:{
            userId:user.userId
          },
          order:{
            events:{
              createdAt:'ASC'
            }
          },
          relations:{
            coins:true,
            events:true
          }
        })

        return {
          code: 200,
          success: true,
          message: 'convert usd to usdt successfully',
          user:userSaved,
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: `convert usd to usdt error:${JSON.stringify(error)}`,
        };
      } finally {
      }
    });
  }

  // Buy Crypto
  async buy(request: Request, dto: BuyOrSellCoinDto): Promise<UserResponse> {
    return await this.dataSource.transaction(async (transactionManager) => {
      try {
        const user = request.user as User;
        if (!user) throw new UnauthorizedException('User not found');

        const result = await axios.get<CryptoCurrencyDetail>(
          cryptoDetailUrl(dto.id),
          {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          },
        );
        const totalPrice =
          dto.amount * result.data.market_data.current_price.usd;

        if (user.usdt < totalPrice)
          return {
            code: 400,
            success: false,
            message: 'Not ennough usdt',
          };
        user.usdt -= totalPrice;
        await transactionManager.getRepository(User).save(user);


        const userCoinExisting = await transactionManager
          .getRepository(UserCoin)
          .findOne({
            where: {
              name: result.data.name,
              user: {
                userId: user.userId,
              },
            },
          });

        if (userCoinExisting) {
          userCoinExisting.amount += dto.amount;
          await transactionManager
            .getRepository(UserCoin)
            .save(userCoinExisting);

            const newEvent =  transactionManager.getRepository(UserEvent).create({
              porfolio:user.usd+user.usdt,
              description:`Buy ${decimalConverterWithoutCurrency(dto.amount)} ${result.data.name} for ${decimalConverterWithoutCurrency(totalPrice)} USDT`,
              user
            })
            await transactionManager.getRepository(UserEvent).save(newEvent)
    
            
          const userExisting = await transactionManager
            .getRepository(User)
            .findOne({
              where: {
                userId: user.userId,
              },
              order:{
                events:{
                  createdAt:'ASC'
                }
              },
              relations: {
                coins: true,
                events:true
              },
            });
          return {
            success: true,
            message: 'Buy coins successfully',
            code: 200,
            user: userExisting,
          };
        } else {
          const newUserCoin = transactionManager
            .getRepository(UserCoin)
            .create({
              coinId: result.data.id,
              name: result.data.name,
              symbol: result.data.symbol,
              avatar: result.data.image.small,
              amount: dto.amount,
              user: user,
            });
          await transactionManager.getRepository(UserCoin).save(newUserCoin);

          const newEvent =  transactionManager.getRepository(UserEvent).create({
            porfolio:user.usd+user.usdt,
            description:`Buy ${decimalConverterWithoutCurrency(dto.amount)} ${result.data.name} for ${decimalConverterWithoutCurrency(totalPrice)} USDT`,
            user
          })
          await transactionManager.getRepository(UserEvent).save(newEvent)

          const userExisting = await transactionManager
            .getRepository(User)
            .findOne({
              where: {
                userId: user.userId,
              },
              order:{
                events:{
                  createdAt:'ASC'
                }
              },
              relations: {
                coins: true,
                events:true
              },
            });
          return {
            success: true,
            message: 'Buy coin successfully',
            code: 200,
            user: userExisting,
          };
        }
      } catch (error) {
        console.log('buy crypto error');

        console.log(error);

        return {
          code: 500,
          success: false,
          message: `Server interal error`,
        };
      }
    });
  }

  // Sell Crypto
  async sell(request: Request, dto: BuyOrSellCoinDto): Promise<UserResponse> {
    return await this.dataSource.transaction(async (transactionManager) => {
      try {
        const user = request.user as User;
        if (!user) throw new UnauthorizedException('User not found');

        const userCoinExisting = await transactionManager
          .getRepository(UserCoin)
          .findOne({
            where: {
              coinId: dto.id,
              user:{
                userId:user.userId
              }
            },

          });
        if (!userCoinExisting)
          return {
            code: 400,
            success: false,
            message: 'User Coin Not Found',
          };
          console.log(userCoinExisting);
          console.log(`dto:${dto.amount}`);
          
          
        if (userCoinExisting.amount < dto.amount)
          return {
            code: 400,
            success: false,
            message: 'User Coin Not Enough To Sell',
          };

        //All thing is good

        if (userCoinExisting.amount === dto.amount) {
          await transactionManager
            .getRepository(UserCoin)
            .remove([userCoinExisting]);
        } else {
          userCoinExisting.amount -= dto.amount;
          await transactionManager
            .getRepository(UserCoin)
            .save(userCoinExisting);
        }

        const result = await axios.get<CryptoCurrencyDetail>(
          cryptoDetailUrl(dto.id),
          {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          },
        );

        const totalPrice =
          dto.amount * result.data.market_data.current_price.usd;
        user.usdt += totalPrice;
        await transactionManager.getRepository(User).save(user);

        const newEvent =  transactionManager.getRepository(UserEvent).create({
          porfolio:user.usd+user.usdt,
          description:`Sell ${decimalConverterWithoutCurrency(dto.amount)} ${result.data.name} at ${decimalConverterWithoutCurrency(totalPrice)} USDT`,
          user
        })
        await transactionManager.getRepository(UserEvent).save(newEvent)

        const userExisting = await transactionManager
          .getRepository(User)
          .findOne({
            where: {
              userId: user.userId,
            },
            order:{
              events:{
                createdAt:'ASC'
              }
            },
            relations: {
              coins: true,
              events:true
            },
          });
        return {
          success: true,
          code: 200,
          message: 'Sell coin successfully!',
          user: userExisting,
        };
      } catch (error) {
        console.log('buy crypto error');

        console.log(error);

        return {
          code: 500,
          success: false,
          message: `Server interal error`,
        };
      }
    });
  }

  findAll() {
    return `This action returns all coins`;
  }
}
