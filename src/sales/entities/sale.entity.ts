/* eslint-disable prettier/prettier */
import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,      
  } from "typeorm";
    
  @Entity({ name: "venta", schema: "ecomm_obj" })
  export class SaleEntity extends AuditoriaEntity {
    

    @PrimaryGeneratedColumn({ name: "id_venta" })
    idVenta: number;    
  
    @Column({ name: "id_usuario" })
    idUsuario: number;  
    
    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.idUsuario)
    @JoinColumn({ name: 'id_usuario' }) 
    usuario: UsuarioEntity; 

  
    @Column({ name: "monto_venta" })
    montoVenta: number;

    @Column({ name: "observacion" })
    observacion: string;   

    @Column({ name: "activo", default: true })
    activo: boolean;
  }
  