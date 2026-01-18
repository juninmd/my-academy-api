import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { MethodsService } from './methods.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Methods } from '@prisma/client';

@ApiTags('Methods')
@Controller('methods')
export class MethodsController {
  constructor(private readonly methodsService: MethodsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new method' })
  @ApiResponse({
    status: 201,
    description: 'The method has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMethodDto: CreateMethodDto): Promise<Methods> {
    return this.methodsService.create(createMethodDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @ApiOperation({ summary: 'List all methods' })
  @ApiResponse({ status: 200, description: 'Return all methods.' })
  findAll(): Promise<Methods[]> {
    return this.methodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a method by id' })
  @ApiResponse({ status: 200, description: 'Return the method.' })
  @ApiResponse({ status: 404, description: 'Method not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Methods> {
    return this.methodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a method' })
  @ApiResponse({
    status: 200,
    description: 'The method has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Method not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMethodDto: UpdateMethodDto,
  ): Promise<Methods> {
    return this.methodsService.update(id, updateMethodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a method' })
  @ApiResponse({
    status: 200,
    description: 'The method has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Method not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Methods> {
    return this.methodsService.remove(id);
  }
}
