import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseJwtAuthGuard } from '../auth/firebase-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('academies')
@UseGuards(FirebaseJwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
@Controller('academies')
export class AcademiesController {
  constructor(private readonly academiesService: AcademiesService) { }

  @Post()
  @Roles(RoleName.ACADEMY_OWNER)
  create(@Body() createAcademyDto: CreateAcademyDto) {
    return this.academiesService.create(createAcademyDto);
  }

  @Get()
  @Roles(RoleName.ACADEMY_OWNER, RoleName.PERSONAL, RoleName.STUDENT)
  findAll() {
    return this.academiesService.findAll();
  }

  @Get(':id')
  @Roles(RoleName.ACADEMY_OWNER, RoleName.PERSONAL, RoleName.STUDENT)
  findOne(@Param('id') id: string) {
    return this.academiesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleName.ACADEMY_OWNER)
  update(@Param('id') id: string, @Body() updateAcademyDto: UpdateAcademyDto) {
    return this.academiesService.update(+id, updateAcademyDto);
  }

  @Delete(':id')
  @Roles(RoleName.ACADEMY_OWNER)
  remove(@Param('id') id: string) {
    return this.academiesService.remove(+id);
  }
}
