<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Visão Geral da Aplicação

My Academy API é uma API RESTful construída com NestJS que gerencia dados de academias, incluindo usuários (alunos e personais), treinos, exercícios, avaliações físicas, agendamentos de aulas e notificações. Ela suporta a criação de treinos personalizados com a capacidade de agrupar exercícios para serem realizados de forma intercalada, otimizando a experiência de treinamento.

## Diagrama de Sequência: Criação de um Grupo de Treino com Exercícios Intercalados

```mermaid
sequenceDiagram
    participant Cliente
    participant API as My Academy API
    participant Prisma as ORM Prisma
    participant DB as Banco de Dados

    Cliente->>API: POST /workouts-groups (CreateWorkoutsGroupDto)
    API->>Prisma: Cria WorkoutsGroup (dados básicos)
    Prisma->>DB: Salva WorkoutsGroup
    DB-->>Prisma: Retorna WorkoutsGroup (com ID)
    Prisma-->>API: Retorna WorkoutsGroup (com ID)

    loop Para cada Workout no WorkoutsGroup
        API->>Prisma: Cria Workout (dados básicos, conecta Exercise, Method)
        Prisma->>DB: Salva Workout
        DB-->>Prisma: Retorna Workout (com ID)
        Prisma-->>API: Retorna Workout (com ID)

        loop Para cada WorkoutBlock no Workout
            API->>Prisma: Cria WorkoutBlock (com workoutId)
            Prisma->>DB: Salva WorkoutBlock
            DB-->>Prisma: Retorna WorkoutBlock (com ID)
            Prisma-->>API: Retorna WorkoutBlock (com ID)

            loop Para cada WorkoutSeries no WorkoutBlock
                API->>Prisma: Cria WorkoutSeries (com workoutId, workoutBlockId)
                Prisma->>DB: Salva WorkoutSeries
                DB-->>Prisma: Retorna WorkoutSeries
                Prisma-->>API: Retorna WorkoutSeries
            end
        end
    end

    API->>Prisma: Busca WorkoutsGroup completo (com relações aninhadas)
    Prisma->>DB: Consulta dados completos
    DB-->>Prisma: Retorna dados
    Prisma-->>API: Retorna WorkoutsGroup completo
    API-->>Cliente: Retorna WorkoutsGroup criado
```

## Descrição

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

<https://app.diagrams.net/#G1s3D1kHTtljAtmFGQCpHJCDz3uvAGX5vU>
<https://rich-cyan-skunk-tutu.cyclic.app>
<https://my-academy-api.onrender.com/>

# Construir a imagem Docker

docker build -t my-academy-api .

# Executar o contêiner

docker run -p 5000:5000 my-academy-api -e "NOME_VARIAVEL=valor"

## ChatId
-1001661357785
