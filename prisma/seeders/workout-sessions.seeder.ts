import { PrismaClient } from '@prisma/client';

export async function seedWorkoutSessions(prisma: PrismaClient) {
  console.log('🏃 Criando sessões de treino...');

  const workoutGroups2 = await prisma.workoutsGroups.findMany();

  // Criar histórico de treinos dos últimos 30 dias
  for (let i = 0; i < 20; i++) {
    const randomGroup = workoutGroups2[Math.floor(Math.random() * workoutGroups2.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    await prisma.workoutGroupSession.create({
      data: {
        workoutGroupId: randomGroup.id,
        isCompleted: Math.random() > 0.2, // 80% completados
        completedAt: date
      }
    });
  }
}
