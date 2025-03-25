/* eslint-disable prettier/prettier */
import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,    
  } from "typeorm";
  
  
  @Entity({ name: "login_history", schema: "ecomm_obj" })
  export class LoginHistoryEntity extends AuditoriaEntity {    
    
    @PrimaryGeneratedColumn({ name: "id_login" })
    idLogin: number;    
  
    @Column({ name: "id_usuario" })
    idUsuario: number; 
  
    @Column({ name: "fecha_login" })
    fechaLogin: Date;

    @Column({ name: "activo", default: true })
    activo: boolean;
  }
  
  