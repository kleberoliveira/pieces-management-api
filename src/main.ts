import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle(configService.get<string>('app.title'))
    .setDescription(configService.get<string>('app.description'))
    .setVersion(configService.get<string>('app.version'))
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<string>('app.port'));
}
bootstrap();
