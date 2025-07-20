import { PrismaClient } from '@prisma/client';

export async function seedWorkoutsAndBlocks(prisma: PrismaClient) {
  console.log('📝 Criando treinos e blocos de treino...');

  // Buscar IDs dos grupos criados
  const peitoGroup = await prisma.workoutsGroups.findFirst({ where: { name: 'Peito e Tríceps' } });
  const costasGroup = await prisma.workoutsGroups.findFirst({ where: { name: 'Costas e Bíceps' } });
  const pernasGroup = await prisma.workoutsGroups.findFirst({ where: { name: 'Pernas Completo' } });
  const ombrosGroup = await prisma.workoutsGroups.findFirst({ where: { name: 'Ombros e Abdômen' } });

  // Buscar métodos
  const seriesNormaisMethod = await prisma.methods.findFirst({ where: { name: 'Series Normais' } });
  const dropSetMethod = await prisma.methods.findFirst({ where: { name: 'Drop Set' } });
  const piramideMethod = await prisma.methods.findFirst({ where: { name: 'Pirâmide Crescente' } });

  // Dados dos treinos para cada grupo
  const workoutsData = {
    'Peito e Tríceps': [
      { exerciseName: 'Supino reto com barra', description: 'Exercício base para peito', method: seriesNormaisMethod },
      { exerciseName: 'Supino inclinado com barra', description: 'Foco na parte superior do peito', method: seriesNormaisMethod },
      { exerciseName: 'Supino com halteres', description: 'Maior amplitude de movimento', method: dropSetMethod },
      { exerciseName: 'Crucifixo Reto', description: 'Isolamento para peito', method: seriesNormaisMethod },
      { exerciseName: 'Tríceps Barra (polia alta)', description: 'Exercício base para tríceps', method: seriesNormaisMethod },
      { exerciseName: 'Tríceps Testa Barra W', description: 'Isolamento para tríceps', method: piramideMethod },
      { exerciseName: 'Tríceps Corda', description: 'Finalização para tríceps', method: seriesNormaisMethod }
    ],
    'Costas e Bíceps': [
      { exerciseName: 'Puxada pela frente', description: 'Exercício base para costas', method: seriesNormaisMethod },
      { exerciseName: 'Remada curvada com barra', description: 'Foco na espessura das costas', method: seriesNormaisMethod },
      { exerciseName: 'Remada unilateral com halter', description: 'Isolamento para costas', method: dropSetMethod },
      { exerciseName: 'Pulldown', description: 'Amplitude total para costas', method: seriesNormaisMethod },
      { exerciseName: 'Rosca de bíceps com barra W', description: 'Exercício base para bíceps', method: seriesNormaisMethod },
      { exerciseName: 'Rosca Concentrada', description: 'Isolamento para bíceps', method: piramideMethod },
      { exerciseName: 'Rosca de martelo alternada', description: 'Foco no braquial', method: seriesNormaisMethod }
    ],
    'Pernas Completo': [
      { exerciseName: 'Agachamento livre', description: 'Exercício base para pernas', method: seriesNormaisMethod },
      { exerciseName: 'Leg Press', description: 'Foco em quadríceps e glúteos', method: seriesNormaisMethod },
      { exerciseName: 'Cadeira Extensora', description: 'Isolamento para quadríceps', method: dropSetMethod },
      { exerciseName: 'Mesa Flexora', description: 'Isolamento para posteriores de coxa', method: seriesNormaisMethod },
      { exerciseName: 'Stiff', description: 'Foco em posteriores e glúteos', method: piramideMethod }
    ],
    'Ombros e Abdômen': [
      { exerciseName: 'Desenvolvimento com halteres', description: 'Exercício base para ombros', method: seriesNormaisMethod },
      { exerciseName: 'Elevação Frontal', description: 'Foco na parte anterior do ombro', method: seriesNormaisMethod },
      { exerciseName: 'Elevação lateral', description: 'Foco na parte lateral do ombro', method: dropSetMethod },
      { exerciseName: 'Desenvolvimento militar', description: 'Força e estabilidade', method: seriesNormaisMethod }
    ]
  };

  const allWorkoutGroups = [peitoGroup, costasGroup, pernasGroup, ombrosGroup];

  for (const group of allWorkoutGroups) {
    if (!group) {
      console.warn(`Grupo de treino não encontrado. Pulando criação de blocos e treinos.`);
      continue;
    }

    // Criar um bloco de treino para cada grupo
    const workoutBlock = await prisma.workoutsBlocks.upsert({
      where: {
        workoutGroupId_order: {
          workoutGroupId: group.id,
          order: 1 // Apenas um bloco por enquanto
        }
      },
      update: {},
      create: {
        workoutGroupId: group.id,
        order: 1
      }
    });

    const exercisesForGroup = workoutsData[group.name as keyof typeof workoutsData];
    if (exercisesForGroup) {
      for (const workout of exercisesForGroup) {
        const exercise = await prisma.exercises.findFirst({ where: { name: workout.exerciseName } });
        if (exercise) {
          await prisma.workouts.upsert({
            where: {
              workoutsBlocksId_exerciseId: {
                workoutsBlocksId: workoutBlock.id,
                exerciseId: exercise.id
              }
            },
            update: {},
            create: {
              exerciseId: exercise.id,
              description: workout.description,
              workoutsBlocksId: workoutBlock.id,
              methodId: workout.method?.id // Pode ser nulo
            }
          });
        } else {
          console.warn(`Exercício "${workout.exerciseName}" não encontrado. Pulando.`);
        }
      }
    }
  }
}
