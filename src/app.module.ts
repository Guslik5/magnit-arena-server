import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {NewsModule} from './news/news.module';
import {LoggerMiddleware} from "./conception/middleware";
import {ConfigModule} from "@nestjs/config";
import {MicroserviceModule} from './microservice/microservice.module';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import { AuthModule } from './auth/auth.module';
import {PrismaService} from "./prisma.service";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    NewsModule,
    MicroserviceModule,
      ClientsModule.register([
          {
        name: "NEWS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 8877
        }
      }
      ]),
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('news');
  }
}
