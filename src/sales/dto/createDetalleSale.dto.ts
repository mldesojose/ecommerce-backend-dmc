/* eslint-disable prettier/prettier */
export class CreateSaleDto {
  idVenta: number;
  item: number;  
  idProducto: number;
  precio: number;
  porcentajeOferta: number;
  precioFinal: number;
  activo: boolean;
  usuarioCreacion: string;
  fechaCreacion: Date;  
  terminalCreacion: string;  
}
