import {Get, Injectable, NotFoundException} from '@nestjs/common';
import { News } from '@prisma/client'
import {PrismaService} from "../prisma.service";
import {NewsCreateDto, NewsUpdateDto} from "./news.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class NewsService {
    constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}
    async findAll() {
        // console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.news.findMany()

    }

    async findOne(id: number) {
        const news = await this.prisma.news.findUnique({
            where: { id: id },
        });

        if (!news) {
            throw new NotFoundException(`News with ID "${id}" not found`);
        }

        return news;
    }

    async create(dto: NewsCreateDto) {
        return this.prisma.news.create({
            data: dto,
        });
    }

    async update(id: number, dto: NewsUpdateDto) {
        try {
            return await this.prisma.news.update({
                where: { id: id },
                data: dto,
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`News with ID "${id}" not found`);
            }
            throw error;
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.news.delete({
                where: { id: id },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`News with ID "${id}" not found`);
            }
            throw error;
        }
    }
}
