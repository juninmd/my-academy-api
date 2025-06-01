import { Module } from '@nestjs/common';
import { WorkoutsBlocksService } from './workouts-blocks.service';
import { WorkoutsBlocksController } from './workouts-blocks.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutsBlocksController],
  providers: [WorkoutsBlocksService],
  exports: [WorkoutsBlocksService],
})
export class WorkoutsBlocksModule {}
