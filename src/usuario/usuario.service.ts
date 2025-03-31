/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { TokenResponse } from 'src/shared/interface/TokenResponse.interface';
import { AuthService } from 'src/auth/auth.service';
import { LoginService } from 'src/login/login.service';
import { CreateLoginDto } from 'src/login/dto/createLogin.dto';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private readonly authService: AuthService,
    private readonly loginService: LoginService,    
  ) {}

  async create(newUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    const UsuarioEntity = this.usuarioRepository.create(newUsuarioDto);
    return this.usuarioRepository.save(UsuarioEntity);
  }

  async findAll(): Promise<UsuarioEntity[]> {
    const Usuario = await this.usuarioRepository.find({
      where: { activo: true },
    }); // Obtener todos los productos
    // Transformar ProductEntity a CreateProductDto
    return Usuario;
  }

  async findLogin(usuario: string, pass: string):  Promise<TokenResponse>   {    
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      userName: usuario,
      password: pass,
    });    
    if (!usuarioEncontrado) {      

      throw new HttpException(
        { 
            statusCode: HttpStatus.UNAUTHORIZED,
            message: `Usuario ${usuario} no encontrado`,
            error: 'Unauthorized'
        },
        HttpStatus.UNAUTHORIZED
    )
    }
    let newLoginDto: CreateLoginDto = {
      idUsuario: usuarioEncontrado.idUsuario,
      activo: true, // Asumo que quieres establecerlo como true por defecto
      fechaLogin: new Date(), // Añadir la fecha de login
      usuarioCreacion: usuarioEncontrado.userName,
      fechaCreacion: new Date(),
      terminalCreacion: 'localhost', // Considera usar el valor real de la terminal
    };
    
    let login = await this.loginService.create(newLoginDto);
    console.log(login);

    return this.authService.generateAccessToken(usuarioEncontrado);    
  }

  async findOne(id: number): Promise<UsuarioEntity> {

    const Usuario = await this.usuarioRepository.findOneBy({
      idUsuario: id
    });    

    if (!Usuario) {
      throw new Error(`Usuario with id ${id} not found`);
    }

    return Usuario;
  }

  async findUsuario(usuario: string, pass: string): Promise<UsuarioEntity> {
    const usuarioencontrado = await this.usuarioRepository.findOneBy({
      userName: usuario,
      password: pass,
    });      

    if (!usuarioencontrado) {
      throw new Error(`Usuario  ${usuario} not found`);
    }

    return usuarioencontrado;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Verificar si el producto existe

    const product = await this.usuarioRepository.findOneBy({
      idUsuario: id
    });  

    if (!product) {
      throw new Error('Usuario no encontrado');
    }

    // Asignar la fecha actual a fechaModificacion
    updateUsuarioDto.fechaModificacion = new Date();

    const updateData = {
      ...updateUsuarioDto,
    };

    // Actualizar el producto en la base de datos
    await this.usuarioRepository.update({ idUsuario: id }, updateData);

    // Retornar el producto actualizado (opcional)
    return this.usuarioRepository.findOne({ where: { idUsuario: id } });
  }

  async remove(id: number, usuario: string, terminal: string) {
    await this.usuarioRepository.update(
      { idUsuario: id },
      {
        activo: false,
        usuarioEliminacion: usuario,
        fechaEliminacion: new Date(),
        terminalEliminacion: terminal,
      },
    );
    return `Product #${id} deleted`;
  }
}
