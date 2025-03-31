/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { SaleService } from './sales.service';
import { DetSaleEntity } from './entities/detVentaentity';

@Module({
    imports: [
      HttpModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT!),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [SaleEntity,DetSaleEntity],
        synchronize: false,
        autoLoadEntities: true,
        retryAttempts: 2,
        retryDelay: 1000,
        connectTimeoutMS: 5000,
        logging: true,
        migrations: [__dirname + "/../migrations/*{.ts,.js}"],
        migrationsTableName: "migrations_history",
      }),
      TypeOrmModule.forFeature([SaleEntity,DetSaleEntity])    
    ],
  controllers: [SalesController],
  providers: [SaleService],
})
export class SalesModule {}
