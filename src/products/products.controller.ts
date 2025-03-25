/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
 } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@ApiTags('Products api')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new Product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'new Product' })
  @Post()
  @UsePipes(ValidationPipe) // Aplica el ValidationPipe a este endpoint
  async create(@Body() createProductDto: CreateProductDto):  Promise<ProductEntity> {
    return await this.productsService.create(createProductDto);
  }


  @ApiOperation({ summary: 'List all Products' })
  @ApiResponse({
    status: 200,
    description: 'List of Products',
    type: [ProductEntity],
  })
  @Get()
  async findAll() : Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Get Product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product details', type: ProductEntity })  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update new Product' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Update Product', type: ProductEntity })  
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: number, @Body() productEntity: UpdateProductDto) {
    return await this.productsService.update(id, productEntity);
  }

  @ApiOperation({ summary: 'Delete Product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'usuario', type: String, description: 'Usuario que realiza la eliminación' })
  @ApiQuery({ name: 'terminal', type: String, description: 'Terminal desde donde se realiza la eliminación' })
  @ApiResponse({ status: 200, description: 'Delete Product', type: ProductEntity })  
  @Delete(':id')
  async remove(
    @Param('id') id: string,    
    @Query('usuario') usuario: string,
    @Query('terminal') terminal: string,

  ) {
    return await this.productsService.remove(+id,usuario,terminal);
  }
}
