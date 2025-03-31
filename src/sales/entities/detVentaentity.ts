/* eslint-disable prettier/prettier */
import { ProductEntity } from "src/products/entities/product.entity";
import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,    
  } from "typeorm";
    
  @Entity({ name: "det_venta", schema: "ecomm_obj" })
  export class DetSaleEntity extends AuditoriaEntity {
    
  
    @PrimaryColumn({ name: "id_venta" })
    idVenta: number;    
  
    @PrimaryColumn({ name: "item" })
    item: number; 

    @ManyToOne(() => ProductEntity, (product) => product.idProducto)
    @JoinColumn({ name: 'id_producto' }) // Ajusta el nombre de la columna FK si es diferente
    producto!: ProductEntity; // Cambia el nombre si prefieres, pero asegúrate de que coincida con la relación

    @Column({ name: "id_producto" })
    idProducto: number; 
  
    @Column({ name: "precio" })
    precio: number;

    @Column({ name: "porcentaje_oferta" })
    porcentajeOferta: number;

    @Column({ name: "precio_final" })
    precioFinal: number;

    @Column({ name: "activo", default: true })
    activo: boolean;

    

  }
  