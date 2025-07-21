import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonalAcademiesService } from './personal-academies.service';
import { CreatePersonalAcademyDto } from './dto/create-personal-academy.dto';
import { UpdatePersonalAcademyDto } from './dto/update-personal-academy.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseJwtAuthGuard } from '../auth/firebase-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('personal-academies')
@UseGuards(FirebaseJwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
@Controller('personal-academies')
export class PersonalAcademiesController {
  constructor(private readonly personalAcademiesService: PersonalAcademiesService) {}

  @Post()
  @Roles(RoleName.ACADEMY_OWNER)
  create(@Body() createPersonalAcademyDto: CreatePersonalAcademyDto) {
    return this.personalAcademiesService.create(createPersonalAcademyDto);
  }

  @Get()
  @Roles(RoleName.ACADEMY_OWNER, RoleName.PERSONAL)
  findAll() {
    return this.personalAcademiesService.findAll();
  }

  @Get(':personalId/:academyId')
  @Roles(RoleName.ACADEMY_OWNER, RoleName.PERSONAL)
  findOne(@Param('personalId') personalId: string, @Param('academyId') academyId: string) {
    return this.personalAcademiesService.findOne(personalId, +academyId);
  }

  @Patch(':personalId/:academyId')
  @Roles(RoleName.ACADEMY_OWNER)
  update(
    @Param('personalId') personalId: string,
    @Param('academyId') academyId: string,
    @Body() updatePersonalAcademyDto: UpdatePersonalAcademyDto,
  ) {
    return this.personalAcademiesService.update(personalId, +academyId, updatePersonalAcademyDto);
  }

  @Delete(':personalId/:academyId')
  @Roles(RoleName.ACADEMY_OWNER)
  remove(@Param('personalId') personalId: string, @Param('academyId') academyId: string) {
    return this.personalAcademiesService.remove(personalId, +academyId);
  }
}
