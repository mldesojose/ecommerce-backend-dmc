import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,    
  } from "typeorm";    
  
  export class AuditoriaEntity {
   
    @Column({name: "usuario_creacion", default: "ADMIN"})  
    usuarioCreacion: String;
  
    @CreateDateColumn({ name: "fecha_creacion", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    fechaCreacion: Date;
    
    @Column({name: "terminal_creacion", default: "192.168.1.1"})
    terminalCreacion: String ;
  
    @Column({name: "usuario_modificacion"})  
    usuarioModificacion: String;
    
    @Column({name:"fecha_modificacion"})  
    fechaModificacion: Date;  
  
    @Column({name:"terminal_modificacion"})
    terminalModificacion: String;
    
    @Column({name: "usuario_eliminacion"})  
    usuarioEliminacion: String;
    
    @Column({name: "fecha_eliminacion"})  
    fechaEliminacion:Date;  
  
    @Column({name: "terminal_eliminacion"})
    terminalEliminacion:String;
 
  }
  