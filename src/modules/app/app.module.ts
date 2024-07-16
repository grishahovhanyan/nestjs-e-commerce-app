import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'

import { JwtAuthGuard, RequestLoggerInterceptor } from '@app/common'
import { AppController } from './app.controller'

import { GlobalModule } from '@modules/global.module'
import { AuthModule } from '@modules/auth/auth.module'
import { UsersModule } from '@modules/users/users.module'
import { ProductsModule } from '@modules/products/products.module'
import { BasketsModule } from '@modules/baskets/baskets.module'
import { OrdersModule } from '@modules/orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    GlobalModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    BasketsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor
    }
  ]
})
export class AppModule {}
