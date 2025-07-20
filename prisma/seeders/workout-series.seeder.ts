import { PrismaClient } from '@prisma/client';

export async function seedWorkoutSeries(prisma: PrismaClient) {
  console.log('🔢 Criando séries dos treinos...');

  const allWorkouts = await prisma.workouts.findMany();

  for (const workout of allWorkouts) {
    // Criar 3-4 séries para cada exercício
    const numSeries = Math.floor(Math.random() * 2) + 3; // 3 ou 4 séries

    for (let i = 0; i < numSeries; i++) {
      await prisma.workoutSeries.create({
        data: {
          workoutId: workout.id,
          repetitions: Math.floor(Math.random() * 6) + 8, // 8-13 reps
          weight: Math.floor(Math.random() * 50) + 20, // 20-70kg
          rest: Math.floor(Math.random() * 31) + 60 // 60-90s
        }
      });
    }
  }
}
