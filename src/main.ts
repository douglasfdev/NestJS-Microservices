import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_IP}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VIRTUALHOST}`,
        ],
        noAck: false,
        queue: 'admin-backend',
      },
    },
  );

  await app.listen();
}
bootstrap();
