import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  //@Expose()
  //@IsString()
  userName: string;

  //@Expose()
  //@IsString()
  password: string;
}