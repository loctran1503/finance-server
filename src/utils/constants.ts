import 'dotenv/config'

export const isProduction = process.env.NODE_ENV === "production";

export const BLOCKING_MESSAGE_DURATION = 5000
export const MESSAGE_LIMIT = 12

