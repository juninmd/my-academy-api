import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personals, WorkoutsGroups } from '@prisma/client';
import { CreateWorkoutsGroupDto } from '../workouts-groups/dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from '../workouts-groups/dto/update-workouts-group.dto';

@Injectable()
export class PersonalsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createpersonalsDto: CreatePersonalDto) {
    return this.prismaService.personals.create({
      data: createpersonalsDto as Personals,
    });
  }

  async assignWorkoutGroupToStudent(
    personalUserId: string,
    studentUserId: string,
    workoutGroupId: number,
  ) {
    const personalStudentRelation = await this.prismaService.personals.findUnique({
      where: {
        studentUserId_personalUserId: {
          studentUserId: studentUserId,
          personalUserId: personalUserId,
        },
      },
    });

    if (!personalStudentRelation) {
      throw new NotFoundException('Personal-student relationship not found.');
    }

    return this.prismaService.workoutsGroups.update({
      where: { id: workoutGroupId },
      data: {
        userId: studentUserId, // Assign to student
        personalId: personalStudentRelation.id, // Link to personal-student relation
      },
    });
  }

  async createWorkoutGroupForStudent(
    personalUserId: string,
    studentUserId: string,
    createWorkoutGroupDto: CreateWorkoutsGroupDto,
  ) {
    const personalStudentRelation = await this.prismaService.personals.findUnique({
      where: {
        studentUserId_personalUserId: {
          studentUserId: studentUserId,
          personalUserId: personalUserId,
        },
      },
    });

    if (!personalStudentRelation) {
      throw new NotFoundException('Personal-student relationship not found.');
    }

    return this.prismaService.workoutsGroups.create({
      data: {
        ...createWorkoutGroupDto,
        userId: studentUserId,
        personalId: personalStudentRelation.id,
      } as WorkoutsGroups,
    });
  }

  async updateWorkoutGroupForStudent(
    personalUserId: string,
    studentUserId: string,
    workoutGroupId: number,
    updateWorkoutGroupDto: UpdateWorkoutsGroupDto,
  ) {
    const personalStudentRelation = await this.prismaService.personals.findUnique({
      where: {
        studentUserId_personalUserId: {
          studentUserId: studentUserId,
          personalUserId: personalUserId,
        },
      },
    });

    if (!personalStudentRelation) {
      throw new NotFoundException('Personal-student relationship not found.');
    }

    const workoutGroup = await this.prismaService.workoutsGroups.findUnique({
      where: { id: workoutGroupId },
    });

    if (!workoutGroup || workoutGroup.userId !== studentUserId || workoutGroup.personalId !== personalStudentRelation.id) {
      throw new NotFoundException('Workout group not found or not associated with this student/personal.');
    }

    return this.prismaService.workoutsGroups.update({
      where: { id: workoutGroupId },
      data: updateWorkoutGroupDto as WorkoutsGroups,
    });
  }

  findAll(personalUserId: string) {
    return this.prismaService.personals.findMany({
      where: {
        personalUserId,
      },
      include: { PersonalUser: true, StudentUser: true }
    });
  }

  async findStudents(personalUserId: string) {
    const personal = await this.prismaService.personals.findMany({
      where: { personalUserId },
      include: { StudentUser: true, PersonalClassSchedule: true }
    });
    return personal.map(q => ({ student: q.StudentUser, schedule: q.PersonalClassSchedule })).flat(1);
  }

  update(id: number, updateDto: UpdatePersonalDto) {
    return this.prismaService.personals.update({
      where: { id },
      data: updateDto as Personals,
    });
  }

  remove(id: number) {
    return this.prismaService.personals.delete({ where: { id } });
  }
}
