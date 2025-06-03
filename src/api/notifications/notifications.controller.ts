import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { RegisterFcmTokenDto } from './dto/register-fcm-token.dto';
import { AuthGuard } from '@nestjs/passport';
import configs from '../../configs';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }

  @Post('register-fcm-token')
  @UseGuards(AuthGuard('firebase-jwt')) // Assuming you have a Firebase JWT strategy
  async registerFcmToken(
    @Req() req,
    @Body() registerFcmTokenDto: RegisterFcmTokenDto,
  ) {
    if (!configs.pushNotifications.enabled) {
      this.logger.warn('Tentativa de registrar token FCM com notificações push desativadas.');
      return { message: 'Notificações push desativadas.' };
    }

    const userId = req.user.uid; // Assuming Firebase user ID is available in req.user.uid
    await this.notificationsService.registerFcmToken(
      userId,
      registerFcmTokenDto.fcmToken,
    );
    return { message: 'Token FCM registrado com sucesso.' };
  }
}
