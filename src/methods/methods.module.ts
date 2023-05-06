import { Module } from '@nestjs/common';
import { MethodsService } from './methods.service';
import { MethodsController } from './methods.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MethodsController],
  providers: [MethodsService, PrismaService]
})
export class MethodsModule {}
