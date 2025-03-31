/* eslint-disable prettier/prettier */
import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryColumn,    
  } from "typeorm";
    
  @Entity({ name: "det_venta", schema: "ecomm_obj" })
  export class DetSaleEntity extends AuditoriaEntity {
    
  
    @PrimaryColumn({ name: "id_venta" })
    idVenta: number;    
  
    @PrimaryColumn({ name: "item" })
    item: number; 

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
  