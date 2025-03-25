/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/createLogin.dto';
import { UpdateLoginDto } from './dto/updateLogin.dto';
import { LoginHistoryEntity } from './entities/loginHistory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(LoginHistoryEntity)
    private readonly loginRepository: Repository<LoginHistoryEntity>    
  ) {}

  async create(newLoginDto: CreateLoginDto):Promise<LoginHistoryEntity> {

    const loginEntity = this.loginRepository.create(newLoginDto);
    return this.loginRepository.save(loginEntity);

  }

  
  async findAll():Promise<LoginHistoryEntity[]> {
    const login = await this.loginRepository.find({
      where: { activo: true },
    }); // Obtener todos los productos
    // Transformar ProductEntity a CreateProductDto
    return login;
  }

  async findOne(id: number): Promise<LoginHistoryEntity> {
    const login = await this.loginRepository.findOne({
      where: { idLogin: id },
    });

    if (!login) {
      throw new Error(`Login with id ${id} not found`);
    }

    return login;
  }

  async update(id: number, updateLoginDto: UpdateLoginDto) {
   // Verificar si el producto existe
   const product = await this.loginRepository.findOne({ where: { idLogin: id } });
   if (!product) {
     throw new Error('Producto no encontrado');
   }  
   
   // Asignar la fecha actual a fechaModificacion
   updateLoginDto.fechaModificacion = new Date();

   const updateData = {    
     ...updateLoginDto,
   };
 
   // Actualizar el producto en la base de datos
   await this.loginRepository.update({ idLogin: id }, updateData);
 
   // Retornar el producto actualizado (opcional)
   return this.loginRepository.findOne({ where: { idLogin: id } });
  }

  async remove(id: number,usuario: string,terminal: string) {
    await this.loginRepository.update({ idLogin: id }, 
      { activo: false,
        usuarioEliminacion:usuario,
        fechaEliminacion: new Date(), 
        terminalEliminacion: terminal
       });        
    return `Product #${id} deleted`;
  }
}
