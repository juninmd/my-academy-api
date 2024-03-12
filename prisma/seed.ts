import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  await prisma.exercises.create({
    data: {
      name: "Crucifixo Reto",
      image: "assets/images/crucifixo_reto.gif",
      tips:
        "Mantenha os braços estendidos durante todo o movimento, Mantenha os cotovelos levemente flexionados para evitar estresse nas articulações,Mantenha os ombros relaxados e evite arquear as costas.",
      mistakes: "Realizar o movimento com os braços flexionados.,Realizar o movimento com uma carga muito pesada, comprometendo a técnica e colocando em risco a integridade dos ombros."
    },
  });

  await prisma.exercises.create({
    data: {
      name: "Supino com halteres",
      image: "assets/images/supino_halteres.gif",
      tips:
        "Mantenha os cotovelos em um ângulo de 90 graus.,Inspire durante a descida dos halteres e expire ao empurrá-los para cima.,Evite mover a cabeça ou o pescoço durante o exercício.",
      mistakes:
        "Usar uma carga muito pesada e comprometer a técnica.,Levantar as costas da bancada ao empurrar os halteres, causando estresse na coluna."
    },
  });

  await prisma.exercises.create({
    data: {
      name: "Supino inclinado com barra",
      image: "assets/images/supino_inclinado_barra.gif",
      tips:
        "Mantenha a barra alinhada com a linha média do peito.,Mantenha os cotovelos em um ângulo de 45 graus em relação ao tronco.,Mantenha os pés firmemente plantados no chão para manter a estabilidade.",
      mistakes:
        "Usar uma carga muito pesada e comprometer a técnica.,Arquear as costas ou levantar as nádegas da bancada ao empurrar a barra, causando estresse na coluna."
    },
  });

  await prisma.exercises.create({
    data: {
      name: "Crucifixo Inclinado Com Halteres",
      image: "assets/images/crucifixo_inclinado_halteres.gif",
      tips:
        "Mantenha os braços estendidos durante todo o movimento.,Mantenha os cotovelos levemente flexionados para evitar estresse nas articulações.,Mantenha os ombros relaxados e evite arquear as costas.",
      mistakes:
        "Realizar o movimento com os braços flexionados.,Realizar o movimento com uma carga muito pesada, comprometendo a técnica e colocando em risco a integridade dos ombros."
    },
  });

  await prisma.exercises.create({
    data: {
      name: "Tríceps Testa Barra W",
      image: "assets/images/tricepes_testa_barra_w.gif",
      tips: "Mantenha o cotovelo próximo à cabeça, Não deixe o pulso dobrar",
      mistakes: "Arquear as costas, Usar peso excessivo",
    }
  });

  // Ombro
  await prisma.exercises.create({
    data: {
      tips: "Mantenha a coluna ereta, Estenda totalmente os braços",
      mistakes:
        "Fazer o movimento com impulso,Não realizar a amplitude completa",
      name: "Desenvolvimento com halteres",
      image: "assets/images/desenvolvimento_halteres.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha os cotovelos elevados, Não deixe o peso balançar",
      mistakes: "Usar peso excessivo, Mover o corpo para ajudar o movimento",
      name: "Elevação Frontal",
      image: "assets/images/elevacao_frontal.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha os ombros para baixo e para trás durante o movimento.",
      mistakes: "Não puxe com as costas.",
      name: "Remada Alta",
      image: "assets/images/remada_alta.gif",
    }
  });
  await prisma.exercises.create({
    data: {
      tips: "Use um peso leve para iniciar o movimento.",
      mistakes: "Não jogue os halteres para cima.",
      name: "Elevação lateral",
      image: "assets/images/elevacao_lateral.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento.",
      mistakes: "Não arqueie as costas.",
      name: "Rosca de bíceps com barra W",
      image: "assets/images/rosca_biceps_barra_w.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha o cotovelo fixo no apoio.",
      mistakes: "Não mova o cotovelo durante o movimento.",
      name: "Rosca Concentrada",
      image: "assets/images/rosca_concentrada.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento.",
      mistakes: "Não balance o corpo para ajudar no movimento.",
      name: "Rosca de martelo alternada",
      image: "assets/images/rosca_martelo_alternada.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento.",
      mistakes: "Não arqueie as costas.",
      name: "Tríceps Barra (polia alta)",
      image: "assets/images/tricepes_barra_polia_alta.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha os cotovelos próximos ao corpo durante o movimento.",
      mistakes: "Não use um peso excessivo.",
      name: "Tríceps Corda",
      image: "assets/images/tricepes_corda.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Use um peso leve para iniciar o movimento.",
      mistakes: "Não desça o halter além da cabeça.",
      name: "Tríceps Francês Halteres",
      image: "assets/images/tricepes_frances_halter.gif",
    }
  });

  // Pernas
  await prisma.exercises.create({
    data: {
      tips: "Mantenha as costas apoiadas no banco durante o movimento.",
      mistakes: "Não levante os quadris do banco.",
      name: "Cadeira Extensora",
      image: "assets/images/cadeira_extensora.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips:
        "Mantenha os joelhos alinhados com os dedos dos pés durante o movimento.",
      mistakes: "Não trave os joelhos no final do movimento.",
      name: "Leg Pres",
      image: "assets/images/leg_press.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha o tronco ereto durante o movimento.",
      mistakes: "Não use um peso excessivo.",
      name: "Adutor de Coxas",
      image: "assets/images/adutor_coxas.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha as costas retas durante o movimento.",
      mistakes: "Não mova os joelhos para os lados.",
      name: "Hack",
      image: "assets/images/hack_machine.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha as costas apoiadas no banco durante o movimento.",
      mistakes: "Não use um peso excessivo.",
      name: "Mesa Flexora",
      image: "assets/images/mesa_flexora.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha o tronco ereto durante o movimento.",
      mistakes: "Não mova o tronco para ajudar no movimento.",
      name: "Cadeira Flexora",
      image: "assets/images/cadeira_flexora.gif",
    }
  });

  await prisma.exercises.create({
    data: {
      tips: "Mantenha o tronco ereto durante o movimento.",
      mistakes: "Não mova o tronco para ajudar no movimento.",
      name: "Flexora em pé unilateral (Vertical)",
      image: "assets/images/cadeira_flexora.gif",
    }
  });

  await prisma.users.create({
    data: {
      id: 1,
      email: 'jr_acn@hotmail.com',
      name: 'Antonio'
    }
  });

  await prisma.workoutsGroups.create({
    data: {
      image: 'assets/images/supino_halteres.gif',
      name: 'Peitos',
      userId: 1,
    }
  });

  await prisma.workoutsGroups.create({
    data: {
      image: 'assets/images/supino_halteres.gif',
      name: 'Peitos',
      userId: 1,
    }
  });

  await prisma.workoutsGroups.create({
    data: {
      image: 'assets/images/supino_halteres.gif',
      name: 'Ombros',
      userId: 1,
    }
  });

  await prisma.workoutsGroups.create({
    data: {
      image: 'assets/images/supino_halteres.gif',
      name: 'Costas',
      userId: 1,
    }
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