/* eslint-disable prettier/prettier */
import { Expose } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { IsTwoDecimalPlaces } from "src/shared/validator/IsTwoDecimalPlacesConstraint";

export class UpdateProductDto  {
        @Expose()
        @IsString({ message: 'nombre de Producto debe ser una cadena de texto.' })
        nomProducto: string;
      
        @Expose()
        @IsString({ message: 'descripcion debe ser una cadena de texto.' })
        descripcion: string;
      
        @Expose()
        @IsNumber({}, { message: 'precio debe ser un número válido.' })
        precio: number;
      
        @Expose()
        @IsString({ message: 'imagen debe ingresar la url de la imagen.' })
        imgUrl: string;
        
        @Expose()
        @IsBoolean({ message: 'el campo Oferta debe ser un valor booleano.' })
        isOferta: boolean;
      
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
        usuarioModificacion: string;    
    
        @IsOptional() // Opcional, ya que se asignará en el servicio
        fechaModificacion: Date;    
    
        @IsString({ message: 'ingrese la terminal.' })
        terminalModificacion: string;
}
