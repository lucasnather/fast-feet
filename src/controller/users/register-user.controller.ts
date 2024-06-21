import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Controller('/api/register')
export class RegisterUserController {

    constructor(
        private prisma: PrismaService
    ) {}

    @Get()
    async get() {
        const users = await this.prisma.users.findMany()
    }
}