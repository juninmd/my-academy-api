import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalAcademyDto } from './create-personal-academy.dto';

export class UpdatePersonalAcademyDto extends PartialType(CreatePersonalAcademyDto) {}
