import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // ============= USERS =============
  console.log('👤 Criando usuários...')

  // Seu usuário (aluno)
  await prisma.users.upsert({
    where: { id: 'db6i035Vjtb77a7cBDnXQVPd3oL2' },
    update: {},
    create: {
      id: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      email: 'jr_acn@hotmail.com',
      name: 'Antonio',
      photoUrl: 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
      roles: { create: { roleUser: { connect: { name: 'STUDENT' } } } },
      fcmToken: 'sample_fcm_token_student'
    }
  });

  // Personal Trainer
  await prisma.users.upsert({
    where: { id: 'RLS96KOMtpYCFol3o1F6S0vdf5I2' },
    update: {},
    create: {
      id: 'RLS96KOMtpYCFol3o1F6S0vdf5I2',
      email: 'personal@gym.com',
      name: 'Carlos Silva',
      photoUrl: 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
      roles: { create: { roleUser: { connect: { name: 'PERSONAL' } } } },
      fcmToken: 'sample_fcm_token_personal'
    }
  });

  // Dono da academia
  await prisma.users.upsert({
    where: { id: 'academy_owner_001' },
    update: {},
    create: {
      id: 'academy_owner_001',
      email: 'owner@gym.com',
      name: 'Maria Academia',
      photoUrl: 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
      roles: { create: { roleUser: { connect: { name: 'ACADEMY_OWNER' } } } },
      fcmToken: 'sample_fcm_token_owner'
    }
  });

  // ============= RELACIONAMENTO PERSONAL-ALUNO =============
  console.log('🤝 Criando relacionamento personal-aluno...')

  const personalStudentRelation = await prisma.personals.upsert({
    where: {
      studentUserId_personalUserId: {
        studentUserId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
        personalUserId: 'RLS96KOMtpYCFol3o1F6S0vdf5I2'
      }
    },
    update: {},
    create: {
      studentUserId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalUserId: 'RLS96KOMtpYCFol3o1F6S0vdf5I2'
    }
  });

  // ============= MÉTODOS DE TREINO =============
  console.log('📋 Criando métodos de treino...')

  const methods: any[] = [
    {
      name: 'Pirâmide Crescente',
      description: 'Aumenta o peso e diminui as repetições a cada série'
    },
    {
      name: 'Pirâmide Decrescente',
      description: 'Diminui o peso e aumenta as repetições a cada série'
    },
    {
      name: 'Drop Set',
      description: 'Executa até a falha e reduz o peso imediatamente'
    },
    {
      name: 'Super Set',
      description: 'Dois exercícios executados em sequência sem descanso'
    },
    {
      name: 'Bi Set',
      description: 'Dois exercícios para o mesmo grupo muscular'
    },
    {
      name: 'Rest-Pause',
      description: 'Pausa breve entre repetições para executar mais reps'
    },
    {
      name: 'Series Normais',
      description: 'Método tradicional com séries e repetições fixas'
    }
  ];

  for (const method of methods) {
    await prisma.methods.upsert({
      update: method,
      where: { name: method.name },
      create: method
    });
  }

  // ============= EXERCÍCIOS =============
  console.log('💪 Criando exercícios...')

  const exercises = [
    // PEITO
    {
      name: "Crucifixo Reto",
      image: "assets/images/crucifixo_reto.gif",
      tips: "Mantenha os braços estendidos durante todo o movimento, Mantenha os cotovelos levemente flexionados para evitar estresse nas articulações, Mantenha os ombros relaxados e evite arquear as costas.",
      mistakes: "Realizar o movimento com os braços flexionados, Realizar o movimento com uma carga muito pesada, comprometendo a técnica e colocando em risco a integridade dos ombros."
    },
    {
      name: "Supino com halteres",
      image: "assets/images/supino_halteres.gif",
      tips: "Mantenha os cotovelos em um ângulo de 90 graus, Inspire durante a descida dos halteres e expire ao empurrá-los para cima, Evite mover a cabeça ou o pescoço durante o exercício.",
      mistakes: "Usar uma carga muito pesada e comprometer a técnica, Levantar as costas da bancada ao empurrar os halteres, causando estresse na coluna."
    },
    {
      name: "Supino inclinado com barra",
      image: "assets/images/supino_inclinado_barra.gif",
      tips: "Mantenha a barra alinhada com a linha média do peito, Mantenha os cotovelos em um ângulo de 45 graus em relação ao tronco, Mantenha os pés firmemente plantados no chão para manter a estabilidade.",
      mistakes: "Usar uma carga muito pesada e comprometer a técnica, Arquear as costas ou levantar as nádegas da bancada ao empurrar a barra, causando estresse na coluna."
    },
    {
      name: "Supino reto com barra",
      image: "assets/images/supino_reto_barra.gif",
      tips: "Mantenha os pés firmes no chão, Desça a barra até tocar o peito, Mantenha os ombros retraídos.",
      mistakes: "Arquear excessivamente as costas, Não controlar a descida da barra, Usar pegada muito aberta ou fechada."
    },
    {
      name: "Flexão de braço",
      image: "assets/images/flexao_braco.gif",
      tips: "Mantenha o corpo alinhado, Desça até o peito quase tocar o chão, Controle a velocidade do movimento.",
      mistakes: "Deixar o quadril cair, Não fazer amplitude completa, Colocar as mãos muito à frente."
    },

    // COSTAS
    {
      name: "Puxada pela frente",
      image: "assets/images/puxada_frente.gif",
      tips: "Mantenha o peito para fora, Puxe até a barra tocar o peito superior, Controle a subida da barra.",
      mistakes: "Puxar com os braços apenas, Inclinar muito o tronco para trás, Usar peso excessivo."
    },
    {
      name: "Remada curvada com barra",
      image: "assets/images/remada_curvada_barra.gif",
      tips: "Mantenha as costas retas, Puxe a barra até o abdômen, Mantenha os cotovelos próximos ao corpo.",
      mistakes: "Arredondar as costas, Usar muito peso, Não controlar o movimento."
    },
    {
      name: "Remada unilateral com halter",
      image: "assets/images/remada_unilateral.gif",
      tips: "Apoie bem o joelho e mão no banco, Puxe o halter até a cintura, Mantenha o core ativado.",
      mistakes: "Rodar o tronco, Não apoiar adequadamente, Usar momentum."
    },
    {
      name: "Pulldown",
      image: "assets/images/pulldown.gif",
      tips: "Mantenha os ombros para baixo, Puxe até tocar o peito, Controle a volta.",
      mistakes: "Balançar o corpo, Puxar atrás da cabeça, Soltar bruscamente."
    },

    // OMBROS
    {
      name: "Desenvolvimento com halteres",
      image: "assets/images/desenvolvimento_halteres.gif",
      tips: "Mantenha a coluna ereta, Estenda totalmente os braços, Controle a descida dos halteres.",
      mistakes: "Fazer o movimento com impulso, Não realizar a amplitude completa, Arquear excessivamente as costas."
    },
    {
      name: "Elevação Frontal",
      image: "assets/images/elevacao_frontal.gif",
      tips: "Mantenha os cotovelos elevados, Não deixe o peso balançar, Suba até a altura dos ombros.",
      mistakes: "Usar peso excessivo, Mover o corpo para ajudar o movimento, Subir muito alto."
    },
    {
      name: "Elevação lateral",
      image: "assets/images/elevacao_lateral.gif",
      tips: "Use um peso leve para iniciar o movimento, Mantenha os cotovelos levemente flexionados, Suba até a altura dos ombros.",
      mistakes: "Não jogue os halteres para cima, Usar peso excessivo, Inclinar o tronco."
    },
    {
      name: "Desenvolvimento militar",
      image: "assets/images/desenvolvimento_militar.gif",
      tips: "Mantenha o core contraído, Empurre a barra verticalmente, Não arqueie as costas.",
      mistakes: "Inclinar muito para trás, Usar pegada muito aberta, Não estabilizar o core."
    },

    // BRAÇOS
    {
      name: "Rosca de bíceps com barra W",
      image: "assets/images/rosca_biceps_barra_w.gif",
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento, Controle a descida, Não balance o corpo.",
      mistakes: "Não arqueie as costas, Usar momentum, Abrir os cotovelos."
    },
    {
      name: "Rosca Concentrada",
      image: "assets/images/rosca_concentrada.gif",
      tips: "Mantenha o cotovelo fixo no apoio, Controle todo o movimento, Foque na contração do bíceps.",
      mistakes: "Não mova o cotovelo durante o movimento, Usar peso excessivo, Fazer movimento parcial."
    },
    {
      name: "Rosca de martelo alternada",
      image: "assets/images/rosca_martelo_alternada.gif",
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento, Alterne os braços, Controle a velocidade.",
      mistakes: "Não balance o corpo para ajudar no movimento, Abrir os cotovelos, Fazer muito rápido."
    },
    {
      name: "Tríceps Barra (polia alta)",
      image: "assets/images/tricepes_barra_polia_alta.gif",
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento, Estenda completamente os braços, Controle a subida.",
      mistakes: "Não arqueie as costas, Abrir os cotovelos, Usar peso excessivo."
    },
    {
      name: "Tríceps Corda",
      image: "assets/images/tricepes_corda.gif",
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento, Abra as cordas no final, Controle o movimento.",
      mistakes: "Não use um peso excessivo, Não abrir as cordas, Balançar o corpo."
    },
    {
      name: "Tríceps Testa Barra W",
      image: "assets/images/tricepes_testa_barra_w.gif",
      tips: "Mantenha o cotovelo próximo à cabeça, Não deixe o pulso dobrar, Desça controladamente.",
      mistakes: "Arquear as costas, Usar peso excessivo, Mover os cotovelos."
    },

    // PERNAS
    {
      name: "Agachamento livre",
      image: "assets/images/agachamento_livre.gif",
      tips: "Mantenha os pés firmes no chão, Desça até o quadril ficar abaixo dos joelhos, Mantenha o peito para cima.",
      mistakes: "Joelhos para dentro, Não fazer amplitude completa, Inclinar muito para frente."
    },
    {
      name: "Leg Press",
      image: "assets/images/leg_press.gif",
      tips: "Mantenha os joelhos alinhados com os dedos dos pés durante o movimento, Desça até formar 90 graus, Empurre com os calcanhares.",
      mistakes: "Não trave os joelhos no final do movimento, Descer muito pouco, Colocar os pés muito alto."
    },
    {
      name: "Cadeira Extensora",
      image: "assets/images/cadeira_extensora.gif",
      tips: "Mantenha as costas apoiadas no banco durante o movimento, Estenda completamente as pernas, Controle a descida.",
      mistakes: "Não levante os quadris do banco, Fazer movimento parcial, Descer muito rápido."
    },
    {
      name: "Mesa Flexora",
      image: "assets/images/mesa_flexora.gif",
      tips: "Mantenha as costas apoiadas no banco durante o movimento, Contraia bem os posteriores, Não arqueie as costas.",
      mistakes: "Não use um peso excessivo, Levantar o quadril, Fazer movimento parcial."
    },
    {
      name: "Stiff",
      image: "assets/images/stiff.gif",
      tips: "Mantenha as pernas levemente flexionadas, Desça até sentir alongar os posteriores, Mantenha as costas retas.",
      mistakes: "Flexionar muito os joelhos, Arredondar as costas, Não controlar a descida."
    }
  ];

  for (const exercise of exercises) {
    await prisma.exercises.upsert({
      where: { name: exercise.name },
      update: {},
      create: exercise
    });
  }

  // ============= GRUPOS DE TREINO =============
  console.log('🏋️ Criando grupos de treino...')

  const workoutGroups = [
    {
      name: 'Peito e Tríceps',
      image: 'assets/images/supino_halteres.gif',
      observations: 'Foque na conexão mente-músculo. Controle sempre a fase excêntrica.',
      userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalId: 1
    },
    {
      name: 'Costas e Bíceps',
      image: 'assets/images/puxada_frente.gif',
      observations: 'Mantenha a postura sempre ereta. Puxe com as costas, não com os braços.',
      userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalId: 1
    },
    {
      name: 'Pernas Completo',
      image: 'assets/images/agachamento_livre.gif',
      observations: 'Dia mais intenso da semana. Hidrate-se bem e mantenha boa alimentação.',
      userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalId: 1
    },
    {
      name: 'Ombros e Abdômen',
      image: 'assets/images/desenvolvimento_halteres.gif',
      observations: 'Exercícios para estabilização e fortalecimento do core.',
      userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalId: 1
    }
  ];

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

  // ============= TREINOS =============
  console.log('📝 Criando treinos...')

  // Buscar IDs dos grupos criados
  const peito = await prisma.workoutsGroups.findFirst({ where: { name: 'Peito e Tríceps' } });
  const costas = await prisma.workoutsGroups.findFirst({ where: { name: 'Costas e Bíceps' } });
  const pernas = await prisma.workoutsGroups.findFirst({ where: { name: 'Pernas Completo' } });
  const ombros = await prisma.workoutsGroups.findFirst({ where: { name: 'Ombros e Abdômen' } });

  // Buscar métodos
  const seriesNormais = await prisma.methods.findFirst({ where: { name: 'Series Normais' } });
  const dropSet = await prisma.methods.findFirst({ where: { name: 'Drop Set' } });
  const piramide = await prisma.methods.findFirst({ where: { name: 'Pirâmide Crescente' } });

  // TREINO PEITO E TRÍCEPS
  const workoutsPeito = [
    { exerciseName: 'Supino reto com barra', description: 'Exercício base para peito' },
    { exerciseName: 'Supino inclinado com barra', description: 'Foco na parte superior do peito' },
    { exerciseName: 'Supino com halteres', description: 'Maior amplitude de movimento' },
    { exerciseName: 'Crucifixo Reto', description: 'Isolamento para peito' },
    { exerciseName: 'Tríceps Barra (polia alta)', description: 'Exercício base para tríceps' },
    { exerciseName: 'Tríceps Testa Barra W', description: 'Isolamento para tríceps' },
    { exerciseName: 'Tríceps Corda', description: 'Finalização para tríceps' }
  ];

  // TREINO PEITO E TRÍCEPS
  // Comentado temporariamente devido a erro de tipo workoutsGroupsId
  /*
  const workoutsPeito = [
    { exerciseName: 'Supino reto com barra', description: 'Exercício base para peito' },
    { exerciseName: 'Supino inclinado com barra', description: 'Foco na parte superior do peito' },
    { exerciseName: 'Supino com halteres', description: 'Maior amplitude de movimento' },
    { exerciseName: 'Crucifixo Reto', description: 'Isolamento para peito' },
    { exerciseName: 'Tríceps Barra (polia alta)', description: 'Exercício base para tríceps' },
    { exerciseName: 'Tríceps Testa Barra W', description: 'Isolamento para tríceps' },
    { exerciseName: 'Tríceps Corda', description: 'Finalização para tríceps' }
  ];

  for (const workout of workoutsPeito) {
    const exercise = await prisma.exercises.findFirst({ where: { name: workout.exerciseName } });
    if (exercise && peito) {
      await prisma.workouts.create({
        data: {
          exerciseId: exercise.id,
          description: workout.description,
          workoutsGroupsId: peito.id, // Este campo precisa ser ajustado para WorkoutsBlocks
          methodId: seriesNormais?.id
        }
      });
    }
  }

  // TREINO COSTAS E BÍCEPS
  const workoutsCostas = [
    { exerciseName: 'Puxada pela frente', description: 'Exercício base para dorsais' },
    { exerciseName: 'Remada curvada com barra', description: 'Espessura das costas' },
    { exerciseName: 'Remada unilateral com halter', description: 'Isolamento unilateral' },
    { exerciseName: 'Pulldown', description: 'Largura dos dorsais' },
    { exerciseName: 'Rosca de bíceps com barra W', description: 'Exercício base para bíceps' },
    { exerciseName: 'Rosca de martelo alternada', description: 'Braquial e braquiorradial' },
    { exerciseName: 'Rosca Concentrada', description: 'Isolamento do bíceps' }
  ];

  for (const workout of workoutsCostas) {
    const exercise = await prisma.exercises.findFirst({ where: { name: workout.exerciseName } });
    if (exercise && costas) {
      await prisma.workouts.create({
        data: {
          exerciseId: exercise.id,
          description: workout.description,
          workoutsGroupsId: costas.id, // Este campo precisa ser ajustado para WorkoutsBlocks
          methodId: seriesNormais?.id
        }
      });
    }
  }

  // TREINO PERNAS
  const workoutsPernas = [
    { exerciseName: 'Agachamento livre', description: 'Rei dos exercícios' },
    { exerciseName: 'Leg Press', description: 'Volume para quadríceps' },
    { exerciseName: 'Cadeira Extensora', description: 'Isolamento quadríceps' },
    { exerciseName: 'Stiff', description: 'Posterior de coxa' },
    { exerciseName: 'Mesa Flexora', description: 'Isolamento posterior' }
  ];

  for (const workout of workoutsPernas) {
    const exercise = await prisma.exercises.findFirst({ where: { name: workout.exerciseName } });
    if (exercise && pernas) {
      await prisma.workouts.create({
        data: {
          exerciseId: exercise.id,
          description: workout.description,
          workoutsGroupsId: pernas.id, // Este campo precisa ser ajustado para WorkoutsBlocks
          methodId: seriesNormais?.id
        }
      });
    }
  }

  // TREINO OMBROS
  const workoutsOmbros = [
    { exerciseName: 'Desenvolvimento militar', description: 'Base para ombros' },
    { exerciseName: 'Desenvolvimento com halteres', description: 'Amplitude completa' },
    { exerciseName: 'Elevação lateral', description: 'Deltoide médio' },
    { exerciseName: 'Elevação Frontal', description: 'Deltoide anterior' }
  ];

  for (const workout of workoutsOmbros) {
    const exercise = await prisma.exercises.findFirst({ where: { name: workout.exerciseName } });
    if (exercise && ombros) {
      await prisma.workouts.create({
        data: {
          exerciseId: exercise.id,
          description: workout.description,
          workoutsGroupsId: ombros.id, // Este campo precisa ser ajustado para WorkoutsBlocks
          methodId: seriesNormais?.id
        }
      });
    }
  }
  */

  // ============= SÉRIES DOS TREINOS =============
  console.log('🔢 Criando séries dos treinos...')

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

  // ============= PLANO DE TREINO PESSOAL =============
  console.log('📅 Criando plano de treino pessoal...')

  await prisma.personalTrainingPlan.create({
    data: {
      personalId: personalStudentRelation.id, // Usar o ID da relação personal-aluno
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      sessionsPerWeek: 4,
      reschedulesPerMonthLimit: 2,
      pricePerSession: 80.0,
      billingType: 'separate',
      status: 'active'
    }
  });

  // ============= HORÁRIOS DO PERSONAL =============
  console.log('⏰ Criando horários do personal...')

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
        personalsId: 1,
        personalTrainingPlanId: 1
      }
    });
  }

  // ============= AGENDAMENTOS =============
  console.log('📋 Criando agendamentos...')

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

  // ============= AVALIAÇÕES FÍSICAS =============
  console.log('📊 Criando avaliações físicas...')

  const assessments = [
    {
      date: new Date('2024-01-15'),
      weight: 75.5,
      height: 175.0,
      bodyFatPercentage: 15.2,
      muscleMassPercentage: 42.1,
      observations: 'Primeira avaliação. Bom condicionamento geral.'
    },
    {
      date: new Date('2024-03-15'),
      weight: 77.2,
      height: 175.0,
      bodyFatPercentage: 13.8,
      muscleMassPercentage: 44.3,
      observations: 'Boa evolução. Ganho de massa magra e redução de gordura.'
    },
    {
      date: new Date('2024-05-15'),
      weight: 78.1,
      height: 175.0,
      bodyFatPercentage: 12.5,
      muscleMassPercentage: 45.8,
      observations: 'Excelente progresso. Manter o protocolo atual.'
    }
  ];

  for (const assessment of assessments) {
    await prisma.physicalAssessment.create({
      data: {
        userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
        ...assessment
      }
    });
  }

  // ============= SESSÕES DE TREINO =============
  console.log('🏃 Criando sessões de treino...')

  const workoutGroups2 = await prisma.workoutsGroups.findMany();

  // Criar histórico de treinos dos últimos 30 dias
  for (let i = 0; i < 20; i++) {
    const randomGroup = workoutGroups2[Math.floor(Math.random() * workoutGroups2.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    await prisma.workoutGroupSession.create({ // Corrigido para workoutGroupSession
      data: {
        workoutGroupId: randomGroup.id,
        isCompleted: Math.random() > 0.2, // 80% completados
        completedAt: date
      }
    });
  }

  // ============= ASSINATURA =============
  console.log('💳 Criando assinatura...')

  await prisma.subscription.create({
    data: {
      userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'ACTIVE',
      amount: 150.0,
      paymentDate: new Date('2024-01-01')
    }
  });

  // ============= ASSINATURA =============
  console.log('💳 Criando motivacional...')

  const motivationalPhrases = [
    {
      title: 'Continue Superando Seus Limites!',
      description: 'O único treino ruim é aquele que não aconteceu. Mantenha a consistência e celebre seu progresso, por menor que seja.',
      isActive: true,
    },
    {
      title: 'Força e Determinação!',
      description: 'Cada repetição te aproxima do seu objetivo. A persistência é a chave para transformar sonhos em realidade.',
      isActive: true,
    },
    {
      title: 'Você É Mais Forte Do Que Pensa!',
      description: 'Desafie-se hoje e colha os frutos amanhã. Seu corpo pode aguentar, é sua mente que você precisa convencer.',
      isActive: true,
    },
    {
      title: 'Disciplina É Liberdade!',
      description: 'A disciplina nos treinos hoje é a liberdade que você terá amanhã. Invista em você mesmo, sempre vale a pena.',
      isActive: true,
    },
    {
      title: 'Cada Dia É Uma Nova Oportunidade!',
      description: 'Não importa como foi ontem, hoje você pode fazer melhor. Consistência supera perfeição sempre.',
      isActive: true,
    },
    {
      title: 'Transforme Seu Corpo, Transforme Sua Vida!',
      description: 'O exercício não apenas fortalece músculos, fortalece caráter. Você está construindo uma versão melhor de si mesmo.',
      isActive: true,
    },
    {
      title: 'Foco No Processo, Não Apenas No Resultado!',
      description: 'Celebre cada treino completado, cada série finalizada. Os pequenos progressos diários criam grandes transformações.',
      isActive: true,
    },
    {
      title: 'Seja Seu Próprio Herói!',
      description: 'Ninguém pode fazer por você, mas você pode fazer por todos que te inspiram. Seja o exemplo que gostaria de seguir.',
      isActive: true,
    },
    {
      title: 'A Dor De Hoje É A Força De Amanhã!',
      description: 'Cada gota de suor é um investimento no seu futuro. Embrace the struggle, pois ela te tornará mais forte.',
      isActive: true,
    },
    {
      title: 'Comprometa-se Com O Processo!',
      description: 'Resultados são consequência de hábitos consistentes. Mantenha o foco e confie no processo de transformação.',
      isActive: true,
    },
  ];

  // Criar frases motivadoras usando createMany para melhor performance
  await prisma.motivationalPhrases.createMany({
    data: motivationalPhrases,
    skipDuplicates: true, // Pula registros duplicados caso já existam
  });

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
