/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SalesModule } from './sales/sales.module';
import { ProductsModule } from './products/products.module';
import { UsuarioModule } from './usuario/usuario.module';
@Module({
  imports: [
    LoginModule, 
    SalesModule, 
    ProductsModule, 
    UsuarioModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
