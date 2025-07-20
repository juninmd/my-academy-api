import { PrismaClient } from '@prisma/client';

export async function seedPersonalSchedules(prisma: PrismaClient) {
  console.log('⏰ Criando horários do personal...');

  const personalStudentRelation = await prisma.personals.findFirst({
    where: {
      studentUserId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalUserId: 'RLS96KOMtpYCFol3o1F6S0vdf5I2'
    }
  });

  if (!personalStudentRelation) {
    console.warn('Relação personal-aluno não encontrada. Pulando criação de horários do personal.');
    return;
  }

  const personalTrainingPlan = await prisma.personalTrainingPlan.findFirst({
    where: { personalId: personalStudentRelation.id }
  });

  if (!personalTrainingPlan) {
    console.warn('Plano de treino pessoal não encontrado. Pulando criação de horários do personal.');
    return;
  }

  const schedule = [
    { dayOfWeek: 1, time: '06:00' }, // Segunda
    { dayOfWeek: 1, time: '07:00' },
    { dayOfWeek: 1, time: '18:00' },
    { dayOfWeek: 1, time: '19:00' },
    { dayOfWeek: 3, time: '06:00' }, // Quarta
    { dayOfWeek: 3, time: '07:00' },
    { dayOfWeek: 3, time: '18:00' },
    { dayOfWeek: 3, time: '19:00' },
    { dayOfWeek: 5, time: '06:00' }, // Sexta
    { dayOfWeek: 5, time: '07:00' },
    { dayOfWeek: 5, time: '18:00' },
    { dayOfWeek: 5, time: '19:00' }
  ];

  for (const slot of schedule) {
    await prisma.personalClassSchedule.create({
      data: {
        dayOfWeek: slot.dayOfWeek,
        time: slot.time,
        status: 'scheduled',
        personalsId: personalStudentRelation.id, // Usar o ID da relação personal-aluno
        personalTrainingPlanId: personalTrainingPlan.id // Usar o ID do plano de treino pessoal
      }
    });
  }
}
