import { Expose } from "class-transformer";
import { IsBoolean, IsNumber,  IsOptional, IsString } from "class-validator";

export class UpdateLoginDto  {
    @Expose()
    @IsNumber({}, { message: 'ingrese el usuario valido.' })
    idUsuario: number;       

    @IsOptional() // Opcional, ya que se asignará en el servicio
    fechaLogin: Date;    
          
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
