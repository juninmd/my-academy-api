import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentAcademyDto } from './create-student-academy.dto';

export class UpdateStudentAcademyDto extends PartialType(CreateStudentAcademyDto) {}
