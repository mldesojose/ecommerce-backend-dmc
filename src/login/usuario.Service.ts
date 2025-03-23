import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>    
  ) {}

  async create(newUsuarioDto: CreateUsuarioDto):Promise<UsuarioEntity> {

    const UsuarioEntity = this.usuarioRepository.create(newUsuarioDto);
    return this.usuarioRepository.save(UsuarioEntity);

  }

  
  async findAll():Promise<UsuarioEntity[]> {
    const Usuario = await this.usuarioRepository.find({
      where: { activo: true },
    }); // Obtener todos los productos
    // Transformar ProductEntity a CreateProductDto
    return Usuario;
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    const Usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: id },
    });

    if (!Usuario) {
      throw new Error(`Usuario with id ${id} not found`);
    }

    return Usuario;
  }

  async findLogin(usuario: String,password: String): Promise<UsuarioEntity> {
    const Usuario = await this.usuarioRepository.findOne({
      where: { userName: usuario, password: password },
    });      

    if (!Usuario) {
      throw new Error(`Usuario con login ${usuario} no encontrado`);
    }

    return Usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
   // Verificar si el producto existe
   const product = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
   if (!product) {
     throw new Error('Producto no encontrado');
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

  async remove(id: number,usuario: String,terminal: String) {
    await this.usuarioRepository.update({ idUsuario: id }, 
      { activo: false,
        usuarioEliminacion:usuario,
        fechaEliminacion: new Date(), 
        terminalEliminacion: terminal
       });        
    return `Product #${id} deleted`;
  }
}
