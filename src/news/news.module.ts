import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService, ConfigService],
})
export class NewsModule {}
