import { PersonalAcademy } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PersonalAcademyEntity implements PersonalAcademy {
  @ApiProperty()
  personalId: string;

  @ApiProperty()
  academyId: number;

  @ApiProperty()
  assignedAt: Date;
}
