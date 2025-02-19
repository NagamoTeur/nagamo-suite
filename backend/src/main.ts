import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active CORS pour permettre les requêtes du front-end
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 API en ligne sur http://localhost:${port}`);
}
bootstrap();

