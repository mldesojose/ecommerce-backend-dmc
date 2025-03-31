/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IsTwoDecimalPlaces } from 'src/shared/validator/IsTwoDecimalPlacesConstraint';
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
  @IsNumber({}, { message: 'precio debe ser un número válido.' })
  precio: number;
  
  @Expose()        
  @IsNumber({}, { message: 'porcentajeOferta debe ser un número válido.' })
  @Min(0, { message: 'porcentajeOferta no puede ser menor que 0.' })
  @Max(100, { message: 'porcentajeOferta no puede ser mayor que 100.' })
  @IsTwoDecimalPlaces({ message: 'porcentajeOferta debe tener exactamente 2 decimales.' })
  porcentajeOferta: number;
        
  @Expose()
  @IsNumber({}, { message: 'precio Final debe ser un número válido.' })
  precioFinal: number;

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
