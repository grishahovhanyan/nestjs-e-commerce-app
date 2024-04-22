import { TransactionInterceptor } from '@interceptors/transaction.interceptor'
import { UseInterceptors } from '@nestjs/common'

export const WithTransaction = () => {
  return UseInterceptors(TransactionInterceptor)
}
