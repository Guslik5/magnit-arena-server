import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import { NewsModule } from './news/news.module';
import {LoggerMiddleware} from "./conception/middleware";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),NewsModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('news');
  }
}
