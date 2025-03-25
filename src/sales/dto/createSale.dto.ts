/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateSaleDto {
  @Expose()
  @IsNumber({}, { message: 'ingrese un usuario valido.' })
  idUsuario: number;

  @Expose()
  @IsNumber({}, { message: 'ingrese un producto valido.' })
  idProducto: number;

  @Expose()
  @IsNumber({}, { message: 'monto de Venta debe ser un número válido.' })
  montoVenta: number;

  @IsOptional()
  observacion: string;

  @Expose()
  @IsBoolean({ message: 'activo debe ser un valor booleano.' })
  activo: boolean;

  @IsString({ message: 'ingrese un usuario.' })
  usuarioCreacion: string;

  @IsOptional() // Opcional, ya que se asignará en el servicio
  fechaCreacion: Date;

  @IsString({ message: 'ingrese la terminal.' })
  terminalCreacion: string;
}
