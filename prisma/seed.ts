import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeders/users.seeder';
import { seedRoles } from './seeders/roles.seeder';
import { seedMethods } from './seeders/methods.seeder';
import { seedPersonalStudentRelation } from './seeders/personal-student-relation.seeder';
import { seedExercises } from './seeders/exercises.seeder';
import { seedWorkoutGroups } from './seeders/workout-groups.seeder';
import { seedWorkoutsAndBlocks } from './seeders/workouts.seeder';
import { seedWorkoutSeries } from './seeders/workout-series.seeder';
import { seedPersonalTrainingPlans } from './seeders/personal-training-plans.seeder';
import { seedPersonalSchedules } from './seeders/personal-schedules.seeder';
import { seedClassBookings } from './seeders/class-bookings.seeder';
import { seedPhysicalAssessments } from './seeders/physical-assessments.seeder';
import { seedWorkoutSessions } from './seeders/workout-sessions.seeder';
import { seedSubscriptions } from './seeders/subscriptions.seeder';
import { seedMotivationalPhrases } from './seeders/motivational-phrases.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  await seedRoles(prisma);
  await seedUsers(prisma);
  await seedPersonalStudentRelation(prisma);
  await seedMethods(prisma);
  await seedExercises(prisma);
  await seedWorkoutGroups(prisma);
  await seedWorkoutsAndBlocks(prisma);
  await seedWorkoutSeries(prisma);
  await seedPersonalTrainingPlans(prisma);
  await seedPersonalSchedules(prisma);
  await seedClassBookings(prisma);
  await seedPhysicalAssessments(prisma);
  await seedWorkoutSessions(prisma);
  await seedSubscriptions(prisma);
  await seedMotivationalPhrases(prisma);

  console.log('✅ Seed concluído.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });