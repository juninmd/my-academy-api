import { StudentAcademy } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StudentAcademyEntity implements StudentAcademy {
  @ApiProperty()
  studentId: string;

  @ApiProperty()
  academyId: number;

  @ApiProperty()
  assignedAt: Date;
}
