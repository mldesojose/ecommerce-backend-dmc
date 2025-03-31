/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SalesModule } from './sales/sales.module';
import { ProductsModule } from './products/products.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoginModule, 
    SalesModule, 
    ProductsModule, 
    UsuarioModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
      envFilePath: '.env', // Ruta al archivo .env (opcional)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
