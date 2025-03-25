/* eslint-disable prettier/prettier */
import { Controller,Get, Post, Body, Patch, Param,Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/createLogin.dto';
import { UpdateLoginDto } from './dto/updateLogin.dto';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
 } from '@nestjs/swagger';
import { LoginHistoryEntity } from './entities/loginHistory.entity';

@ApiTags('Login api')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @ApiOperation({ summary: 'Create a new LoginHistory' })
  @ApiBody({ type: CreateLoginDto })
  @ApiResponse({ status: 201, description: 'new LoginHistory' })
  @Post()
  @UsePipes(ValidationPipe) 
  async create(@Body() createLoginDto: CreateLoginDto):  Promise<LoginHistoryEntity> {
    return await this.loginService.create(createLoginDto);
  }

  @ApiOperation({ summary: 'List all LoginHistory' })
  @ApiResponse({
      status: 200,
      description: 'List of LoginHistory',
      type: [LoginHistoryEntity],
    })
  @Get()
  async findAll() : Promise<LoginHistoryEntity[]> {
    return await this.loginService.findAll();
  }

  @ApiOperation({ summary: 'Get LoginHistory by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'LoginHistory details', 
    type: LoginHistoryEntity })  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.loginService.findOne(id);
  }


  @ApiOperation({ summary: 'Update a new LoginHistory' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Update LoginHistory', 
    type: LoginHistoryEntity })  
  @Patch(':id')
  @UsePipes(ValidationPipe) 
  async update(@Param('id') id: number, @Body() updateLoginDto: UpdateLoginDto) {
    return await this.loginService.update(id, updateLoginDto);
  }

  @ApiOperation({ summary: 'Delete LoginHistory by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'usuario', type: String, description: 'Usuario que realiza la eliminación' })
  @ApiQuery({ name: 'terminal', type: String, description: 'Terminal desde donde se realiza la eliminación' })
  @ApiResponse({ status: 200, description: 'Delete LoginHistory', 
      type: LoginHistoryEntity })  
  @Delete(':id')
  async remove(
    @Param('id') id: string,    
    @Query('usuario') usuario: string,
    @Query('terminal') terminal: string,
  ) {
    return await this.loginService.remove(+id,usuario,terminal);
  }
}
