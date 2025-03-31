/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
 } from '@nestjs/swagger';
import { SaleService } from './sales.service';
import { SaleEntity } from './entities/sale.entity';
import { DetSaleEntity } from './entities/detVentaentity';
import { DetSaleResponseDto } from './dto/detSaleResponse.dto';

@ApiTags('Sales api')
@Controller('sales')
export class SalesController {
  constructor(private readonly SaleService: SaleService) {}

  @ApiOperation({ summary: 'Create a new Sale' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, description: 'new Sale' })
  @Post()
  @UsePipes(ValidationPipe) 
  async create(@Body() createSaleDto: CreateSaleDto[]):  Promise<SaleEntity> {
    return await this.SaleService.create(createSaleDto);        
  }

  @ApiOperation({ summary: 'List all Sales' })
  @ApiResponse({
      status: 200,
      description: 'List of Sales',
      type: [SaleEntity],
    })
  @Get()
  async findAll()  : Promise<SaleEntity[]> {
    return await this.SaleService.findAll();
  }

  @ApiOperation({ summary: 'Get Sales by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Sales details', 
      type: SaleEntity })  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.SaleService.findOne(id);
  }


    @ApiOperation({ summary: 'Detalle de Ventas' })
    @ApiResponse({ status: 200, description: 'Datos de los productos vendidos' })   
    @Get('detalle/:id') 
    async findUsuario(
      @Param('id') id: number
    ): Promise<DetSaleResponseDto[]> {
      return await this.SaleService.findDetSale(id);
    }

  @ApiOperation({ summary: 'Update a Sale' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Update Sale', 
      type: SaleEntity })  
  @Patch(':id')
  @UsePipes(ValidationPipe) 
  async update(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto) {
    return await this.SaleService.update(+id, updateSaleDto);
  }

  @ApiOperation({ summary: 'Delete Sale by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'usuario', type: String, description: 'Usuario que realiza la eliminación' })
  @ApiQuery({ name: 'terminal', type: String, description: 'Terminal desde donde se realiza la eliminación' })
  @ApiResponse({ status: 200, description: 'Delete Sale', 
      type: SaleEntity })  
  @Delete(':id')
  async remove(
    @Param('id') id: string,    
    @Query('usuario') usuario: string,
    @Query('terminal') terminal: string,
) {
    return await this.SaleService.remove(+id,usuario,terminal);
  }
}
