import 'dotenv/config'

export const isProduction = process.env.NODE_ENV === "production";

export const BLOCKING_MESSAGE_DURATION = 2000
export const MESSAGE_LIMIT = 12

export const cryptoDetailUrl = (id : string) : string  =>{
    return `https://api.coingecko.com/api/v3/coins/${id}`
  }

