import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsuarioEntity } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHistoryEntity } from './entities/loginHistory.entity';

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
      entities: [UsuarioEntity,LoginHistoryEntity],
      synchronize: false,
      retryAttempts: 2,
      retryDelay: 1000,
      connectTimeoutMS: 5000,
      logging: true,
      migrations: [__dirname + "/../migrations/*{.ts,.js}"],
      migrationsTableName: "migrations_history",
    }),
    TypeOrmModule.forFeature([UsuarioEntity,LoginHistoryEntity])    
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
