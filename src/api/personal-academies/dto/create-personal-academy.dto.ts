import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatePersonalAcademyDto {
  @ApiProperty()
  @IsString()
  personalId: string;

  @ApiProperty()
  @IsNumber()
  academyId: number;
}
