import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< Updated upstream

  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Set global API prefix
  app.setGlobalPrefix('api');

  const port = 3001;
  await app.listen(port);
  
  console.log(`🚀 Application running on http://localhost:${port}`);
}

bootstrap();
=======
  await app.listen(3001);
}
bootstrap();
>>>>>>> Stashed changes
