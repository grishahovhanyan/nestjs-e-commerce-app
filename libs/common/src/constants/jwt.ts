export const JWT_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET || 'strong_secret_key',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1d'
}
