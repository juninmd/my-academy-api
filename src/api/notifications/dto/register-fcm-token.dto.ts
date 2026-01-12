import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterFcmTokenDto {
  @ApiProperty({ description: 'The Firebase Cloud Messaging token for the device', example: 'fcm_token_example_12345' })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;
}
