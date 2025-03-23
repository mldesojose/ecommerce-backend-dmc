import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
 } from '@nestjs/swagger';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.Service';

@ApiTags('Usuario api')
@Controller('Usuario')
export class UsuarioController {
  constructor(private readonly UsuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Create a new Usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'new Usuario' })
  @Post()
  @UsePipes(ValidationPipe) 
  async create(@Body() createUsuarioDto: CreateUsuarioDto):  Promise<UsuarioEntity> {
    return await this.UsuarioService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'List all Usuario' })
  @ApiResponse({
      status: 200,
      description: 'List of Usuario',
      type: [UsuarioEntity],
    })
  @Get()
  async findAll() : Promise<UsuarioEntity[]> {
    return await this.UsuarioService.findAll();
  }

  @ApiOperation({ summary: 'Get Usuario by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Usuario details', 
    type: UsuarioEntity })  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.UsuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Get Usuario Login' })
  @ApiQuery({ name: 'usuario', type: String, description: 'Usuario que se Logea' })
  @ApiQuery({ name: 'password', type: String, description: 'Contraseña de Usuario' })
  @ApiResponse({ status: 200, description: 'Usuario Login', 
    type: UsuarioEntity })    
  async findLogin(
    @Query('usuario') usuario: string,
    @Query('password') password: string,
  ) {
    return await this.UsuarioService.findLogin(usuario,password);
  }


  @ApiOperation({ summary: 'Update a new Usuario' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Update Usuario', 
    type: UsuarioEntity })  
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.UsuarioService.update(id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Delete Usuario by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'usuario', type: String, description: 'Usuario que realiza la eliminación' })
  @ApiQuery({ name: 'terminal', type: String, description: 'Terminal desde donde se realiza la eliminación' })
  @ApiResponse({ status: 200, description: 'Delete Usuario', 
      type: UsuarioEntity })  
  @Delete(':id')
  async remove(
    @Param('id') id: string,    
    @Query('usuario') usuario: string,
    @Query('terminal') terminal: string,
  ) {
    return await this.UsuarioService.remove(+id,usuario,terminal);
  }
}
