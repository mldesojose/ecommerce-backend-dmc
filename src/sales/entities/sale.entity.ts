/* eslint-disable prettier/prettier */
import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,    
  } from "typeorm";
    
  @Entity({ name: "venta", schema: "ecomm_obj" })
  export class SaleEntity extends AuditoriaEntity {
    

    @PrimaryGeneratedColumn({ name: "id_venta" })
    idVenta: number;    
  
    @Column({ name: "id_usuario" })
    idUsuario: number;   
  
    @Column({ name: "monto_venta" })
    montoVenta: number;

    @Column({ name: "observacion" })
    observacion: string;   

    @Column({ name: "activo", default: true })
    activo: boolean;
  }
  