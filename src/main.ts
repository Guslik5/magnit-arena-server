import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const corsOptions: CorsOptions = {
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };

    app.enableCors(corsOptions);

    await app.listen(4200);
    console.log("App listening on port 4200");

    const microserviceApp =
        await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.TCP,
            options: {
                host: "localhost",
                port: 8877
            },
        });

    await microserviceApp.listen();
    console.log("microservice listening on port 8877");
}

bootstrap();




