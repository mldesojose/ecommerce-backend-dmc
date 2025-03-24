import { AuditoriaEntity } from "src/shared/entities/auditoria.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,    
  } from "typeorm";
  
  
  @Entity({ name: "usuario", schema: "ecomm_obj" })
  export class UsuarioEntity extends AuditoriaEntity {
    

    @PrimaryGeneratedColumn({ name: "id_usuario" })
    idUsuario: number;    
  
    @Column({ name: "nom_persona" })
    nomPersona: String; 

    @Column({ name: "username" })
    userName: String; 
  
    @Column({ name: "password" })
    password: String;

    @Column({ name: "rol" })
    rol: String;

    @Column({ name: "activo", default: true })
    activo: boolean;
  }
  