import { Academy } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AcademyEntity implements Academy {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  address: string | null;

  @ApiProperty({ required: false, nullable: true })
  ownerId: string | null;
}
