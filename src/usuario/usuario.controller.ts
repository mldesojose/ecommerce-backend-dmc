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
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './entities/usuario.entity';
import { LoginDto } from './dto/Login.dto';

@ApiTags('Usuario api')
@Controller('Usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Create a new Usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'new Usuario' })
  @Post()
  @UsePipes(ValidationPipe) 
  async create(@Body() createUsuarioDto: CreateUsuarioDto):  Promise<UsuarioEntity> {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'List all Usuario' })
  @ApiResponse({
      status: 200,
      description: 'List of Usuario',
      type: [UsuarioEntity],
    })
  @Get()
  async findAll() : Promise<UsuarioEntity[]> {
    return await this.usuarioService.findAll();
  }

  @ApiOperation({ summary: 'Get Usuario by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Usuario details', 
    type: UsuarioEntity })  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usuarioService.findOne(id);
  }


  @ApiOperation({ summary: 'Update a new Usuario' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Update Usuario', 
    type: UsuarioEntity })  
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioService.update(id, updateUsuarioDto);
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
    return await this.usuarioService.remove(+id,usuario,terminal);
  }



    @ApiOperation({ summary: 'Login Usuario' })
    @ApiResponse({ status: 200, description: 'Usuario Login', type: UsuarioEntity })
    @Get('login')      
    async findLogin(@Query() query: LoginDto) {

      console.log("usuario 1:" , query.userName);
      console.log("password 1:" , query.password);

      return await this.usuarioService.findLogin(query.userName, query.password);
    }

    @ApiOperation({ summary: 'Login Usuario2' })
    @ApiResponse({ status: 200, description: 'Usuario Login2' })    
    @Get('login2')              
    async findLogin2(
      @Query('usuario') userName: string,
      @Query('terminal') password: string,

    ) {
      console.log("usuario 1:" , userName);
      console.log("password 1:" , password);     

      return await this.usuarioService.findLogin(userName, password);
    }



}
