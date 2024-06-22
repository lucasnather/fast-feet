import { Injectable } from "@nestjs/common";
import { Prisma, Users } from "@prisma/client";

@Injectable()
export abstract class UserInterface {
    abstract create(user: Prisma.UsersCreateInput): Promise<Users>
    abstract findByCPF(cpf: string): Promise<Users | null>
}