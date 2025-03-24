import { Expose } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUsuarioDto  {

    @Expose()
    @IsString({ message: 'nombre de persona es obligatorio.' })
    nomPersona: String;     

    @Expose()
    @IsString({ message: 'el user name es obligatorio.' })
    userName: String;       

    @Expose()
    @IsString({ message: 'el password es obligatorio.' })
    password: String;    

    @Expose()
    @IsString({ message: 'el rol es obligatorio.' })
    rol: String;    

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
