/* eslint-disable prettier/prettier */
import {    
    Column,    
  } from "typeorm";    
  
  export class AuditoriaEntity {
   
    
    @Column({name: "usuario_creacion"})
    usuarioCreacion: string;  
    
    @Column({name: "fecha_creacion"})
    fechaCreacion: Date;    
    
    @Column({name: "terminal_creacion"})
    terminalCreacion: string ;
  
    @Column({name: "usuario_modificacion"})  
    usuarioModificacion: string;
    
    @Column({name:"fecha_modificacion"})  
    fechaModificacion: Date;  
  
    @Column({name:"terminal_modificacion"})
    terminalModificacion: string;
    
    @Column({name: "usuario_eliminacion"})  
    usuarioEliminacion: string;
    
    @Column({name: "fecha_eliminacion"})  
    fechaEliminacion:Date;  
  
    @Column({name: "terminal_eliminacion"})
    terminalEliminacion:string;
 
  }
  