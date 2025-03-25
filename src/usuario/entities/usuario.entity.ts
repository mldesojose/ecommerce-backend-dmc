/* eslint-disable prettier/prettier */
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario', schema: 'ecomm_obj' })
export class UsuarioEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'nom_persona' })
  nomPersona: string;

  @Column({ name: 'username' })
  userName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'rol' })
  rol: string;

  @Column({ name: 'activo', default: true })
  activo: boolean;
}
