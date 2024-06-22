import { Injectable } from "@nestjs/common";
import { Role, Users } from "@prisma/client";
import { UserInterface } from "src/interface/user.interface";

interface CreateUserRequest {
    name: string
    cpf: string
    password: string
    city: string
    role?: Role | null
}

interface CreateUserResponse {
    users: Users
}

@Injectable()
export class CreateUserService {

    constructor(
        private userInterface: UserInterface
    ) {}

    async execute({ name, cpf, password, city, role }: CreateUserRequest): Promise<any> {
        const findUser = await this.userInterface.findByCPF(cpf)

        if(findUser) throw new Error('User already exists')

        const users = await this.userInterface.create({
            city,
            cpf,
            name,
            password,
            role
        })

        return {
            users
        }
    }
}