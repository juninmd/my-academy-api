import { Module } from '@nestjs/common';
import { MethodsService } from './methods.service';
import { MethodsController } from './methods.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [MethodsController],
  providers: [MethodsService, PrismaService],
})
export class MethodsModule {}
