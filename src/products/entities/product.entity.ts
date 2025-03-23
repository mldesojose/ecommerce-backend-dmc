import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Double,    
  } from "typeorm";
    
  @Entity({ name: "producto", schema: "ecomm_obj" })
  export class ProductEntity extends AuditoriaEntity {
    
  
    @PrimaryGeneratedColumn({ name: "id_producto" })
    idProducto: number;    
  
    @Column({ name: "nom_producto" })
    nomProducto: String; 

    @Column({ name: "descripcion" })
    descripcion: String; 
  
    @Column({ name: "precio" })
    precio: number;

    @Column({ name: "is_oferta" })
    isOferta: Boolean;

    @Column({ name: "porcentaje_oferta" })
    porcentajeOferta: number;

    @Column({ name: "precio_final" })
    precioFinal: number;

    @Column({ name: "activo", default: true })
    activo: boolean;

  }
  