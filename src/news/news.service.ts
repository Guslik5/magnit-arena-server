import { Injectable } from '@nestjs/common';
import { News } from '@prisma/client'
import {PrismaService} from "../prisma.service";
import {NewsCreateDto} from "./news.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class NewsService {
    constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}
    findAll() {
        // console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.news.findMany()

    }
    create(dto: NewsCreateDto) {
        return this.prisma.news.create({
            data: dto,
        })
    }
}
