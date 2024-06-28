import { CpfInvalidError } from "../erros/cpf-invalid.error.js";
import { ResourceNotFoundError } from "../erros/resource-not-found.error.js";
import { HashEncoder } from "../interface/cryptography/hash-encoder.interface.js";
import { UserInterface } from "../interface/user.interface.js";
import { Injectable } from "@nestjs/common";
import { Role, Users } from "@prisma/client";

interface UpdateUserRequest {
    id: string
    name?: string | null
    cpf?: string | null
    password?: string | null
    city?: string | null
    role?: Role | null
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
        let hash: string | undefined
        const findUsers = await this.userInterface.findById(id)

        
        if(!findUsers) throw new ResourceNotFoundError()

        if(findUsers?.cpf === cpf) throw new CpfInvalidError()

        if(password !== undefined && password) {
            hash = await this.hashEncoder.hashPassword(password)
        }

        const users = await this.userInterface.save({
            city: city || findUsers.city,
            cpf: cpf || findUsers.cpf,
            name: name || findUsers.name,
            password: hash || findUsers.password,
            role: role || findUsers.role
        }, id)

        return {
            users
        }
    }
}