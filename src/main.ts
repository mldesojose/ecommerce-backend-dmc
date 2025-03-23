import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { SalesModule } from './sales/sales.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Habilita la validación global

  app.setGlobalPrefix('api');

  const productsConfig = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API for managing products')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const productsDocument = SwaggerModule.createDocument(app, productsConfig, {
    include: [ProductsModule],
  });

  const loginConfig = new DocumentBuilder()
    .setTitle('Login History API')
    .setDescription('API for managing login History')
    .setVersion('1.0')
    .addTag('login')
    .build();

  const loginDocument = SwaggerModule.createDocument(app, loginConfig, {
    include: [LoginModule],
  });

  const saleConfig = new DocumentBuilder()
  .setTitle('Sale API')
  .setDescription('API for managing Sale')
  .setVersion('1.0')
  .addTag('sale')
  .build();

const saleDocument = SwaggerModule.createDocument(app, saleConfig, {
  include: [SalesModule],
});

const usuarioConfig = new DocumentBuilder()
.setTitle('Usuario API')
.setDescription('API for managing Usuario')
.setVersion('1.0')
.addTag('usuario')
.build();

const usuarioDocument = SwaggerModule.createDocument(app, usuarioConfig, {
include: [LoginModule],
});




  SwaggerModule.setup('apidocs/products', app, productsDocument);
  SwaggerModule.setup('apidocs/login', app, loginDocument);
  SwaggerModule.setup('apidocs/sale', app, saleDocument);
  SwaggerModule.setup('apidocs/usuario', app, usuarioDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();