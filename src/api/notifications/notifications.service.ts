import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from '../../prisma.service';
import { Notifications } from '@prisma/client';
import { FirebaseService } from '../firebase/firebase.service';
import configs from '../../configs';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.prismaService.notifications.create({
      data: createNotificationDto as Notifications,
    });

    if (configs.pushNotifications.enabled) {
      // Optionally, send a push notification when a new notification is created
      // This depends on your business logic. For now, let's assume we want to send it.
      const receiver = await this.prismaService.users.findUnique({
        where: { id: notification.receiverId },
      });

      if (receiver?.fcmToken) {
        await this.sendPushNotification(
          receiver.fcmToken,
          notification.message,
          notification.type,
        );
      }
    }

    return notification;
  }

  findAll() {
    return this.prismaService.notifications.findMany();
  }

  findOne(id: number) {
    return this.prismaService.notifications.findUnique({
      where: { id },
    });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prismaService.notifications.update({
      where: { id },
      data: updateNotificationDto as Notifications,
    });
  }

  remove(id: number) {
    return this.prismaService.notifications.delete({
      where: { id },
    });
  }

  async registerFcmToken(userId: string, fcmToken: string) {
    if (!configs.pushNotifications.enabled) {
      this.logger.warn('Tentativa de registrar token FCM com notificações push desativadas.');
      return;
    }

    return this.prismaService.users.update({
      where: { id: userId },
      data: { fcmToken },
    });
  }

  async sendPushNotification(
    fcmToken: string,
    message: string,
    type: string,
  ) {
    if (!configs.pushNotifications.enabled) {
      this.logger.warn('Tentativa de enviar notificação push com notificações push desativadas.');
      return;
    }

    try {
      const response = await this.firebaseService.messaging.send({
        token: fcmToken,
        notification: {
          title: 'My Academy',
          body: message,
        },
        data: {
          type: type,
          // Add more custom data as needed
        },
      });
      this.logger.log(`Notificação push enviada com sucesso: ${response}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar notificação push: ${error.message}`);
    }
  }
}
