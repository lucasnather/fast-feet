import { Injectable } from "@nestjs/common";
import { Role, Users } from "@prisma/client";
import { HashEncoder } from "src/interface/cryptography/hash-encoder.interface";
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
        private userInterface: UserInterface,
        private hashEncoder: HashEncoder 
    ) {}

    async execute({ name, cpf, password, city, role }: CreateUserRequest): Promise<CreateUserResponse> {
        const findUser = await this.userInterface.findByCPF(cpf)

        if(findUser) throw new Error('User already exists')

        const hash = await this.hashEncoder.hashPassword(password)

        const users = await this.userInterface.create({
            city,
            cpf,
            name,
            password: hash,
            role
        })

        return {
            users
        }
    }
}