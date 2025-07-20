import { PrismaClient } from '@prisma/client';
import { workoutGroups } from './data/workout-groups.data';

export async function seedWorkoutGroups(prisma: PrismaClient) {
  console.log('🏋️ Criando grupos de treino...');

  for (const group of workoutGroups) {
    await prisma.workoutsGroups.upsert({
      where: {
        userId_name: {
          userId: group.userId,
          name: group.name
        }
      },
      update: {},
      create: group
    });
  }
}
