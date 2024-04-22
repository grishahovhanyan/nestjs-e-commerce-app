import { SwaggerBasketsIndex } from './baskets-index'
import { SwaggerBasketsAddProduct } from './baskets-add-product'
import { SwaggerBasketsRemoveProduct } from './baskets-remove-product'
import { SwaggerBasketsEmpty } from './baskets-empty'
import { SwaggerBasketsCheckout } from './baskets-checkout'

export const SwaggerBaskets = {
  index: SwaggerBasketsIndex,
  addProduct: SwaggerBasketsAddProduct,
  removeProduct: SwaggerBasketsRemoveProduct,
  empty: SwaggerBasketsEmpty,
  checkout: SwaggerBasketsCheckout
}
