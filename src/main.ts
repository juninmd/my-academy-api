import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { version, name, description } from '../package.json';
import { apiReference } from '@scalar/nestjs-api-reference';

const logger = new Logger('Bootstrap');
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    // Habilita CORS
    app.enableCors();

    // Configuração do Swagger
    const config = new DocumentBuilder()
      .setTitle(`${name} API`)
      .setDescription(`${description} - Documentação da API`)
      .setVersion(version)
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT para acessar as rotas protegidas',
      }, 'access-token')
      .addTag('Auth', 'Gerenciamento de autenticação e autorização de usuários, incluindo login, registro e recuperação de senha.')
      .addTag('Users', 'Gerenciamento de informações e perfis de usuários, incluindo criação, edição e visualização.')
      .addTag('WorkoutsGroups', 'Gerenciamento de grupos de treinos personalizados, incluindo criação, edição e associação de exercícios.')
      .addTag('PhysicalAssessments', 'Gerenciamento de avaliações físicas, incluindo medições, histórico e agendamentos.')
      .addTag('Exercises', 'Gerenciamento de exercícios, incluindo informações, variações e demonstrações.')
      .addTag('Methods', 'Gerenciamento de diferentes métodos de treino e suas características.')
      .addTag('Notifications', 'Gerenciamento de notificações e tokens FCM')
      .addTag('ClassBookings', 'Gerenciamento de agendamentos de aulas')
      .addTag('subscriptions', 'Gerenciamento de assinaturas de usuários')
      .addTag('Workouts', 'Gerenciamento de treinos, blocos e grupos de exercícios')
      .addTag('App', ' principal da aplicação')
      .addTag('PersonalTrainingPlans', 'Gerenciamento de planos de treinamento personalizados')
      .addTag('Personals', 'Gerenciamento de personais trainers')
      .addTag('physical-assessment-schedules', 'Gerenciamento de agendamentos de avaliações físicas')
      .addTag('WorkoutsBlocks', 'Gerenciamento de blocos de treinos')
      .addTag('WorkoutsSeries', 'Gerenciamento de séries de treinos')
      .addTag('WorkoutsSessions', 'Gerenciamento de sessões de treinos')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      jsonDocumentUrl: 'openapi.json',
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: `${name} API Documentation`,
      // customCss: `
      //   .swagger-ui .topbar { display: none; }
      //   .swagger-ui .scheme-container { display: none; }
      //   .swagger-ui .opblock-tag { background-color: #6a1b9a; color: white; }`,
    });

    app.use(
      '/reference',
      apiReference({
        content: document,
        autoDarkMode: true,
        layout: 'modern',
        theme: 'purple',
        metaData: {
          title: `${name} API Documentation`,
          description: `${description} - Explore e teste os endpoints da API.`,
          ogTitle: `${name} API`,
          ogDescription: `${description} - Documentação interativa da API.`,
          ogImage: 'https://scalar.com/logo.png', // Substitua por uma imagem relevante
        },
        showSidebar: true,
        showSearch: true,
        showDownloadButton: true,
        showWebhooks: true,
        showExampleValue: true,
        showExampleValueInSchema: true,
        showExampleValueInResponse: true,
        showExampleValueInRequest: true,
        showExampleValueInParameters: true,
        showExampleValueInHeaders: true,
        showExampleValueInCookies: true,
        showExampleValueInQuery: true,
        showExampleValueInPath: true,
        showExampleValueInBody: true,
        showExampleValueInFormData: true,
        showExampleValueInSecurity: true,
        showExampleValueInCallbacks: true,
        showExampleValueInLinks: true,
        showExampleValueInServers: true,
        showExampleValueInExternalDocs: true,
        showExampleValueInTags: true,
        showExampleValueInComponents: true,
        showExampleValueInPaths: true,
      }),
    )

    const port = process.env.PORT || 9000;
    await app.listen(port);
    logger.log(`Servidor iniciado na porta ${port}`);
    console.log(`Swagger (Scalar) disponível em http://localhost:${port}/api`); // Log do endpoint do Swagger
  } catch (error) {
    logger.error(`Erro ao iniciar a aplicação: ${error.message}`);
    process.exit(1);
  }
}
bootstrap().catch(err => logger.error(err));
