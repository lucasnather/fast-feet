import { Injectable } from "@nestjs/common";
import { $Enums, Prisma  } from "@prisma/client";
import { PrismaService } from "../database/prisma/prisma.service.js";
import { UserInterface } from "../interface/user.interface.js";

@Injectable()
export class UserRepository implements UserInterface {

    constructor(
        private prisma: PrismaService
    ) {}

    async create({ city, cpf,name, password, role }: Prisma.UsersCreateInput) {

        const users = await this.prisma.users.create({
            data: {
                city,
                cpf,
                name,
                password,
                role: role ? role : 'deliveryMan'
            }
        })

        return users
    }

    async save({ city, cpf,name,password,role }: Prisma.UsersUpdateInput, id: string) {
        const users = await this.prisma.users.update({
            where: {
                id
            },
            data: {
                city,
                cpf,
                name,
                password,
                role,
                updatedAt: new Date()
            }
        })

        return users
    }

    async deleteById(id: string) {
        await this.prisma.users.delete({
            where: {
                id
            }
        })
    }
    

    async findByCPF(cpf: string) {
        const users = await this.prisma.users.findUnique({
            where: {
                cpf
            }
        })

        if(!users) return null

        return users
    }

    async findById(id: string) {
        const users = await this.prisma.users.findUnique({
            where: {
                id
            }
        })

        if(!users) return null

        return users
    }

   

}