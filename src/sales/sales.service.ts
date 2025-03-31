/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';
import { DetSaleEntity } from './entities/detVentaentity';
import { DetSaleResponseDto } from './dto/detSaleResponse.dto';

@Injectable()
export class SaleService {

  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,    
    @InjectRepository(DetSaleEntity)
    private readonly detVentaRepository: Repository<DetSaleEntity>,
  ) {}

  async create(newSaleDto: CreateSaleDto[]):Promise<SaleEntity> {

    if (!newSaleDto || newSaleDto.length === 0) {
      throw new Error('Debe proporcionar al menos un item de venta');
    }

    // Obtener el primer elemento para datos comunes
    const firstItem = newSaleDto[0];
    
    // Calcular el monto total de la venta
    const montoVenta = newSaleDto.reduce((sum, item) => sum + item.precioFinal, 0);

    // Crear la venta principal
    const sale = new SaleEntity();
    sale.idUsuario = firstItem.idUsuario;
    sale.montoVenta = montoVenta;
    sale.observacion = firstItem.observacion || '';
    sale.activo = firstItem.activo;
    sale.usuarioCreacion = firstItem.usuarioCreacion;
    sale.terminalCreacion = firstItem.terminalCreacion;
    sale.fechaCreacion = new Date();

    // Usamos una transacción para atomicidad
    return await this.saleRepository.manager.transaction(async (transactionalEntityManager) => {
      // Guardar la venta principal
      const savedSale = await transactionalEntityManager.save(SaleEntity, sale);

      // Crear y guardar los detalles de venta
      const detallesPromises = newSaleDto.map((item, index) => {
        const detalle = new DetSaleEntity();
        detalle.idVenta = savedSale.idVenta;
        detalle.item = index + 1;
        detalle.idProducto = item.idProducto;
        detalle.precio = item.precio;
        detalle.porcentajeOferta = item.porcentajeOferta || 0;
        detalle.precioFinal = item.precioFinal;
        detalle.activo = item.activo;
        detalle.usuarioCreacion = item.usuarioCreacion;
        detalle.terminalCreacion = item.terminalCreacion;
        detalle.fechaCreacion = new Date();
        
        return transactionalEntityManager.save(DetSaleEntity, detalle);
      });

      await Promise.all(detallesPromises);

      return savedSale;
    });


  }

  
  async findAll():Promise<SaleEntity[]> {
    const Sale = await this.saleRepository.find({
      where: { activo: true },
    }); // Obtener todos los productos
    // Transformar ProductEntity a CreateProductDto
    return Sale;
  }

  async findDetSale(id: number): Promise<DetSaleResponseDto[]> {
    const detSale = await this.detVentaRepository.find({
      where: { idVenta: id },
      relations: ['producto'],
    });

    if (!detSale || detSale.length === 0) {
      throw new Error(`Detalle de Sale with id ${id} not found`);
    }

    return detSale.map((item) => ({
      idVenta: item.idVenta,
      item: item.item,
      idProducto: item.producto.idProducto,
      nomProducto: item.producto.nomProducto, // Accede al nombre del producto
      precio: item.precio,
      porcentajeOferta: item.porcentajeOferta,
      precioFinal: item.precioFinal,
      activo: item.activo,
    }));
}

  async findOne(id: number): Promise<SaleEntity> {
    const Sale = await this.saleRepository.findOne({
      where: { idVenta: id },
    });

    if (!Sale) {
      throw new Error(`Sale with id ${id} not found`);
    }

    return Sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
   // Verificar si el producto existe
   const product = await this.saleRepository.findOne({ where: { idVenta: id } });
   if (!product) {
     throw new Error('Producto no encontrado');
   }  
   
   // Asignar la fecha actual a fechaModificacion
   updateSaleDto.fechaModificacion = new Date();

   const updateData = {    
     ...updateSaleDto,
   };
 
   // Actualizar el producto en la base de datos
   await this.saleRepository.update({ idVenta: id }, updateData);
 
   // Retornar el producto actualizado (opcional)
   return this.saleRepository.findOne({ where: { idVenta: id } });
  }

  async remove(id: number,usario: string,terminal: string) {
    await this.saleRepository.update({ idVenta: id }, 
      { activo: false,
        usuarioEliminacion:usario,
        fechaEliminacion: new Date(), 
        terminalEliminacion: terminal
       });        
    return `Product #${id} deleted`;
  }
}
