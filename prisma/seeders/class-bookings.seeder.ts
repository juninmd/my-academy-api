import { PrismaClient } from '@prisma/client';

export async function seedClassBookings(prisma: PrismaClient) {
  console.log('📋 Criando agendamentos...');

  const classSchedules = await prisma.personalClassSchedule.findMany();

  // Agendar algumas aulas
  for (let i = 0; i < 6; i++) {
    const randomSchedule = classSchedules[Math.floor(Math.random() * classSchedules.length)];
    await prisma.classBooking.create({
      data: {
        personalClassScheduleId: randomSchedule.id,
        studentId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
        bookingDate: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)), // Próximos dias
        status: i < 2 ? 'completed' : 'booked'
      }
    });
  }
}
