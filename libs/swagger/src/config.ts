import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export const SWAGGER_CONFIGS = new DocumentBuilder()
  .setTitle('NestJS E-commerce Application')
  .setDescription('NestJS E-commerce Application API')
  .setVersion('1.0')
  .addServer(process.env.NESTJS_API_URL)
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' })
  .build()

export const SWAGGER_OPTIONS: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    requestInterceptor: (req) => {
      req.credentials = 'include'
      return req
    }
  },
  customSiteTitle: 'NestJS - Swagger'
}
