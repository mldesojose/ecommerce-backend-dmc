import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>    
  ) {}

  async create(newProducto: CreateProductDto):Promise<ProductEntity> {
    if (newProducto.isOferta) {

      newProducto.precioFinal =
        newProducto.precio - newProducto.precio * newProducto.porcentajeOferta;

    } else {
      newProducto.precioFinal = newProducto.precio;
    }

    const productEntity = this.productRepository.create(newProducto);
    return this.productRepository.save(productEntity);

  }

  async findAll(): Promise<ProductEntity[]>{

    const products = await this.productRepository.find({
      where: { activo: true },
    }); // Obtener todos los productos

    // Transformar ProductEntity a CreateProductDto
    return products;
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { idProducto: id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  }


  async update(id: number, newProducto: UpdateProductDto) {
    // Verificar si el producto existe
    const product = await this.productRepository.findOne({ where: { idProducto: id } });
    if (!product) {
      throw new Error('Producto no encontrado');
    }
  
    // Calcular el precioFinal si isOferta es true
    if (newProducto.isOferta) {
      if (newProducto.porcentajeOferta == null || isNaN(newProducto.porcentajeOferta)) {
        throw new Error('porcentajeOferta es requerido cuando isOferta es true');
      }
      newProducto.precioFinal =
        newProducto.precio - newProducto.precio * newProducto.porcentajeOferta;
    } else {
      newProducto.precioFinal = newProducto.precio;
    }

      // Asignar la fecha actual a fechaModificacion
    newProducto.fechaModificacion = new Date();

    const updateData = {    
      ...newProducto,
    };
  
    // Actualizar el producto en la base de datos
    await this.productRepository.update({ idProducto: id }, updateData);
  
    // Retornar el producto actualizado (opcional)
    return this.productRepository.findOne({ where: { idProducto: id } });
  }

  async remove(id: number,usuario: String,terminal: String) {    
    await this.productRepository.update({ idProducto: id }, 
      { activo: false,
        usuarioEliminacion:usuario,
        fechaEliminacion: new Date(), 
        terminalEliminacion: terminal
       });        
    return `Product #${id} deleted`;
  }
}
