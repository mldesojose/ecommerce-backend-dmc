import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';

@Injectable()
export class SaleService {

  constructor(
    @InjectRepository(SaleEntity)
    private readonly SaleRepository: Repository<SaleEntity>    
  ) {}

  async create(newSaleDto: CreateSaleDto):Promise<SaleEntity> {

    const SaleEntity = this.SaleRepository.create(newSaleDto);
    return this.SaleRepository.save(SaleEntity);

  }

  
  async findAll():Promise<SaleEntity[]> {
    const Sale = await this.SaleRepository.find({
      where: { activo: true },
    }); // Obtener todos los productos
    // Transformar ProductEntity a CreateProductDto
    return Sale;
  }

  async findOne(id: number): Promise<SaleEntity> {
    const Sale = await this.SaleRepository.findOne({
      where: { idVenta: id },
    });

    if (!Sale) {
      throw new Error(`Sale with id ${id} not found`);
    }

    return Sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
   // Verificar si el producto existe
   const product = await this.SaleRepository.findOne({ where: { idVenta: id } });
   if (!product) {
     throw new Error('Producto no encontrado');
   }  
   
   // Asignar la fecha actual a fechaModificacion
   updateSaleDto.fechaModificacion = new Date();

   const updateData = {    
     ...updateSaleDto,
   };
 
   // Actualizar el producto en la base de datos
   await this.SaleRepository.update({ idVenta: id }, updateData);
 
   // Retornar el producto actualizado (opcional)
   return this.SaleRepository.findOne({ where: { idVenta: id } });
  }

  async remove(id: number,usario: String,terminal: String) {
    await this.SaleRepository.update({ idVenta: id }, 
      { activo: false,
        usuarioEliminacion:usario,
        fechaEliminacion: new Date(), 
        terminalEliminacion: terminal
       });        
    return `Product #${id} deleted`;
  }
}
