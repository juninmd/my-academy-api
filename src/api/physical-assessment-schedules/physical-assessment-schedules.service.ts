import { Injectable } from '@nestjs/common';
import { CreatePhysicalAssessmentScheduleDto } from './dto/create-physical-assessment-schedule.dto';
import { UpdatePhysicalAssessmentScheduleDto } from './dto/update-physical-assessment-schedule.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PhysicalAssessmentSchedulesService {
  constructor(private prisma: PrismaService) {}

  create(createPhysicalAssessmentScheduleDto: CreatePhysicalAssessmentScheduleDto) {
    return this.prisma.physicalAssessmentSchedule.create({
      data: createPhysicalAssessmentScheduleDto,
    });
  }

  findAll() {
    return this.prisma.physicalAssessmentSchedule.findMany();
  }

  findOne(id: number) {
    return this.prisma.physicalAssessmentSchedule.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePhysicalAssessmentScheduleDto: UpdatePhysicalAssessmentScheduleDto) {
    return this.prisma.physicalAssessmentSchedule.update({
      where: { id },
      data: updatePhysicalAssessmentScheduleDto,
    });
  }

  remove(id: number) {
    return this.prisma.physicalAssessmentSchedule.delete({
      where: { id },
    });
  }
}
