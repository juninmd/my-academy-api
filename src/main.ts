import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { version, name, description } from '../package.json';

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
      .setTitle(name)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      jsonDocumentUrl: 'openapi.json',
    });

    const port = process.env.PORT || 9000;
    await app.listen(port);
    logger.log(`Servidor iniciado na porta ${port}`);
    console.log(`Swagger disponível em http://localhost:${port}/api`); // Log do endpoint do Swagger
  } catch (error) {
    logger.error(`Erro ao iniciar a aplicação: ${error.message}`);
    process.exit(1);
  }
}
bootstrap().catch(err => logger.error(err));
