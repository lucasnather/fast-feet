import { Injectable } from "@nestjs/common";
import { Prisma, Users } from "@prisma/client";

@Injectable()
export abstract class UserInterface {
    abstract create(user: Prisma.UsersCreateInput): Promise<Users>
    abstract save(user: Prisma.UsersUpdateInput, id: string): Promise<Users>
    abstract deleteById(id: string): Promise<void>
    abstract findByCPF(cpf: string): Promise<Users | null>
    abstract findById(id: string): Promise<Users | null>
}