export const JWT_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET || 'strong_secret_key',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1d'
}

export const SORT_DIRECTIONS = {
  ascending: 'ASC',
  descending: 'DESC'
}

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 20

export const PRODUCTS_SORT_FIELDS = ['id', 'createdAt', 'price']

export const ORDERS_SORT_FIELDS = ['id', 'createdAt']
