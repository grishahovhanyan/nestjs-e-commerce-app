// TODO: create role admin,user
// * USER can create basket and add to it products, see his orders
// * ADMIN can create products, watch all baskets, watch all orders

// TODO: update readme (architecture, e-commerce)

// TODO: add payment (stripe)
// TODO: add email notification (resource from udemy)

import 'dotenv/config'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'

import { ValidationPipe } from '@app/common'
import { SWAGGER_CONFIGS, SWAGGER_OPTIONS } from '@app/swagger'
import { AppModule } from '@modules/app/app.module'

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('api/v1')

  const swaggerDocument = SwaggerModule.createDocument(app, SWAGGER_CONFIGS)
  SwaggerModule.setup('swagger-ui', app, swaggerDocument, SWAGGER_OPTIONS)

  const port = process.env.PORT || 4000
  await app.listen(port, () => console.info(`Server started on port: ${port}`))
}
bootstrap()
