import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Param,
  NotFoundException,
  Put,
  Delete
} from '@nestjs/common';
import { NewsService } from './news.service';
import {ParseIntPipe} from "../conception/pipe";
import {LoggingInterceptor} from "../conception/interceptor";
import {NewsCreateDto, NewsUpdateDto} from "./news.dto";
import {ConfigService} from "@nestjs/config";

@Controller('news')
@UseInterceptors(LoggingInterceptor)
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const news = await this.newsService.findOne(id);
    if (!news) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return news;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: NewsCreateDto) {
    return this.newsService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: NewsUpdateDto){
    console.log(`Attempting to update news with ID: ${id} and data:`, dto); // Добавьте эту строку
    try {
      return await this.newsService.update(id, dto);
    } catch (error) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.newsService.remove(id);
      return { message: `News with ID "${id}" deleted successfully` };
    } catch (error) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
  }

}
