import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service.js";
@Module({
    exports: [PrismaService],
    providers: [PrismaService]
})
export class DatabaseModule {}