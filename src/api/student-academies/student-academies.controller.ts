import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentAcademiesService } from './student-academies.service';
import { CreateStudentAcademyDto } from './dto/create-student-academy.dto';
import { UpdateStudentAcademyDto } from './dto/update-student-academy.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseJwtAuthGuard } from '../auth/firebase-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('student-academies')
@UseGuards(FirebaseJwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
@Controller('student-academies')
export class StudentAcademiesController {
  constructor(private readonly studentAcademiesService: StudentAcademiesService) {}

  @Post()
  @Roles(RoleName.ACADEMY_OWNER)
  create(@Body() createStudentAcademyDto: CreateStudentAcademyDto) {
    return this.studentAcademiesService.create(createStudentAcademyDto);
  }

  @Get()
  @Roles(RoleName.ACADEMY_OWNER, RoleName.PERSONAL)
  findAll() {
    return this.studentAcademiesService.findAll();
  }

  @Get(':studentId/:academyId')
  @Roles(RoleName.ACADEMY_OWNER, RoleName.PERSONAL, RoleName.STUDENT)
  findOne(@Param('studentId') studentId: string, @Param('academyId') academyId: string) {
    return this.studentAcademiesService.findOne(studentId, +academyId);
  }

  @Patch(':studentId/:academyId')
  @Roles(RoleName.ACADEMY_OWNER)
  update(
    @Param('studentId') studentId: string,
    @Param('academyId') academyId: string,
    @Body() updateStudentAcademyDto: UpdateStudentAcademyDto,
  ) {
    return this.studentAcademiesService.update(studentId, +academyId, updateStudentAcademyDto);
  }

  @Delete(':studentId/:academyId')
  @Roles(RoleName.ACADEMY_OWNER)
  remove(@Param('studentId') studentId: string, @Param('academyId') academyId: string) {
    return this.studentAcademiesService.remove(studentId, +academyId);
  }
}
