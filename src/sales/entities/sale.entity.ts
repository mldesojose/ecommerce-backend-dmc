import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Double,    
  } from "typeorm";
    
  @Entity({ name: "venta", schema: "ecomm_obj" })
  export class SaleEntity extends AuditoriaEntity {
    

    @PrimaryGeneratedColumn({ name: "id_venta" })
    idVenta: number;    
  
    @Column({ name: "id_usuario" })
    idUsuario: number; 

    @Column({ name: "id_producto" })
    idProducto: number; 
  
    @Column({ name: "monto_venta" })
    montoVenta: Number;

    @Column({ name: "observacion" })
    observacion: String;   

    @Column({ name: "activo", default: true })
    activo: boolean;
  }
  