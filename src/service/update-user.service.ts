import { Injectable } from "@nestjs/common";
import { Role, Users } from "@prisma/client";
import { HashEncoder } from "src/interface/cryptography/hash-encoder.interface";
import { UserInterface } from "src/interface/user.interface";

interface UpdateUserRequest {
    id: string
    name: string | null
    cpf: string | null
    password: string | null
    city: string | null
    role: Role | null
}

interface UpdateUserResponse {
    users: Users
}

@Injectable()
export class UpdateUserService {

    constructor(
        private userInterface: UserInterface,
        private hashEncoder: HashEncoder 
    ) {}

    async execute({ id, name, cpf, password, city, role }: UpdateUserRequest): Promise<UpdateUserResponse> {
        let hash: string = ""
        const findUsers = await this.userInterface.findById(id)

        if(!findUsers) throw new Error('id nao encontrado')

        if(password !== null) {
            hash = await this.hashEncoder.hashPassword(password)
        }

        const users = await this.userInterface.save({
            city: city || findUsers.city,
            cpf: cpf || findUsers.cpf,
            name: cpf || findUsers.name,
            password: hash || findUsers.password,
            role: role || findUsers.role
        }, id)

        return {
            users
        }
    }
}