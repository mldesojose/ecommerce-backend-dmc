/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsuarioEntity } from './entities/usuario.entity';

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
        entities: [UsuarioEntity],
        synchronize: false,       
        retryAttempts: 2,
        retryDelay: 1000,
        connectTimeoutMS: 5000,
        logging: true,
        migrations: [__dirname + "/../migrations/*{.ts,.js}"],
        migrationsTableName: "migrations_history",
      }),
      TypeOrmModule.forFeature([UsuarioEntity])    
    ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
