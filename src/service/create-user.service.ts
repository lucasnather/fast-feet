import { Injectable } from "@nestjs/common";
import { Role, Users } from "@prisma/client";
import { CpfInvalidError } from "../erros/cpf-invalid.error.js";
import { UserAlreadyExistsError } from "../erros/user-already-exists.error.js";
import { HashEncoder } from "../interface/cryptography/hash-encoder.interface.js";
import { UserInterface } from "../interface/user.interface.js";

interface CreateUserRequest {
    name: string
    cpf: string
    password: string
    city: string
    role: Role | null
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

        const isCpfValid = this.validateCpf(cpf)

        if(!isCpfValid) throw new CpfInvalidError()

        const findUser = await this.userInterface.findByCPF(cpf)

        if(findUser) throw new UserAlreadyExistsError()

        const hash = await this.hashEncoder.hashPassword(password)

        const users = await this.userInterface.create({
            city,
            cpf,
            name,
            password: hash,
            role: role ? role : 'admin'
        })

        return {
            users
        }
    }

    private validateCpf(cpf: string) {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

        const isRegexMatch = regex.test(cpf)

        return isRegexMatch
    }
}