import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonalDto {
  @ApiProperty({ description: 'The ID of the personal trainer', example: 1 })
  id: number;

  @ApiProperty({ description: 'The user ID associated with the personal trainer', example: 'clx0d4d0d000008jv03712345' })
  personalUserId: string;
}
