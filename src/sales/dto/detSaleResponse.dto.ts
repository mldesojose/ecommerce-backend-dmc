/* eslint-disable prettier/prettier */
export class DetSaleResponseDto {
    idVenta: number;
    item: number;
    idProducto: number;
    nomProducto: string; // Campo del producto
    precio: number;
    porcentajeOferta: number;
    precioFinal: number;
    activo: boolean;
  }