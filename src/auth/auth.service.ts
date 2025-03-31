/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from 'src/shared/interface/TokenResponse.interface';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
 
 
  validarUsuario(username: string, password: string) {
    // ir a BD y buscar el usuario
    if (username === 'admin' && password === 'admin') {
      return { name: 'Diego', lastname: 'Flores' };
    }
    return null;
  }

  generateAccessToken(user: UsuarioEntity):TokenResponse {
    const payload = { username: user.userName, sub: user.idUsuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
