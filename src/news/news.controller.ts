import {Body, Controller, Get, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import { NewsService } from './news.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {LoggingInterceptor} from "../conception/interceptor";
import {NewsCreateDto} from "./news.dto";
import {ConfigService} from "@nestjs/config";

@Controller('news')
@UseInterceptors(LoggingInterceptor)
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.newsService.findAll();
  }


  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: NewsCreateDto) {
    return this.newsService.create(dto);
  }
}
