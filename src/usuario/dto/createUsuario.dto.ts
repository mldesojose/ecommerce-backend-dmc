/* eslint-disable prettier/prettier */
import { Expose } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {

    @Expose()
    @IsString({ message: 'nombre de persona es obligatorio.' })
    nomPersona: string;     

    @Expose()
    @IsString({ message: 'el user name es obligatorio.' })
    userName: string;       

    @Expose()
    @IsString({ message: 'el password es obligatorio.' })
    password: string;    

    @Expose()
    @IsString({ message: 'el rol es obligatorio.' })
    rol: string;    

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
