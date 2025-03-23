import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './createSale.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSaleDto  {

        @Expose()
        @IsNumber({}, { message: 'ingrese un usuario valido.' })
        idUsuario: number;     
        
        @Expose()
        @IsNumber({}, { message: 'ingrese un producto valido.' })
        idProducto: number;      

        @Expose()
        @IsNumber({}, { message: 'monto de Venta debe ser un número válido.' })
        montoVenta: Number;    
        
        @IsOptional() 
        observacion: String;  

        @Expose()
        @IsBoolean({ message: 'activo debe ser un valor booleano.' })
        activo: boolean;

        @IsString({ message: 'ingrese un usuario.' })
        usuarioModificacion: String;    
    
        @IsOptional() // Opcional, ya que se asignará en el servicio
        fechaModificacion: Date;    
    
        @IsString({ message: 'ingrese la terminal.' })
        terminalModificacion: String;
}
