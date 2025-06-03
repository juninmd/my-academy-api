import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  id: string;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  photoUrl: string;
  @ApiProperty({ required: false })
  telegramId?: string;
}
