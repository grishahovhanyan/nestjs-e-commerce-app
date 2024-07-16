import { VALIDATION_MESSAGES, ERROR_MESSAGES } from '@app/common'
import { paginatedResponseProperties, productProperties, basketProperties, orderProperties } from './schema-properties'

const BAD_REQUEST_DESCRIPTION = 'Bad Request'

const arrayProperty = (key: string, example: string[]) => ({
  [key]: {
    type: 'array',
    items: { type: 'string' },
    example
  }
})

export const SWAGGER_SCHEMAS = {
  // ******* Exceptions *******
  registerValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('firstName', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('lastName', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('email', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('password', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('confirmPassword', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('nonFieldErrors', [ERROR_MESSAGES.userAlreadyExists])
      }
    }
  },
  loginValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('email', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('password', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('nonFieldErrors', [VALIDATION_MESSAGES.invalidEmailPassword])
      }
    }
  },
  createProductValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('name', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('category', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('price', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidNumber]),
        ...arrayProperty('description', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString])
      }
    }
  },
  updateProductValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('name', [VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('category', [VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('price', [VALIDATION_MESSAGES.invalidNumber]),
        ...arrayProperty('description', [VALIDATION_MESSAGES.invalidString])
      }
    }
  },
  addBasketProductValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('productId', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidInteger]),
        ...arrayProperty('quantity', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidInteger]),
        ...arrayProperty('color', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString])
      }
    }
  },
  removeBasketProductValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('productId', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidInteger]),
        ...arrayProperty('quantity', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidInteger]),
        ...arrayProperty('color', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString])
      }
    }
  },
  emptyBasketValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('nonFieldErrors', [ERROR_MESSAGES.basketIsEmpty])
      }
    }
  },
  checkoutBasketValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('address', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('paymentMethod', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('nonFieldErrors', [ERROR_MESSAGES.basketIsEmpty])
      }
    }
  },
  // **************************
  loginResponse: { schema: { properties: { accessToken: { type: 'string' } } } },
  paginatedResponse: (itemProperties) => ({
    schema: { properties: paginatedResponseProperties(itemProperties) }
  }),
  getProductResponse: { schema: { properties: productProperties } },
  getBasketResponse: { schema: { properties: basketProperties } },
  getOrderResponse: { schema: { properties: orderProperties } }
}
