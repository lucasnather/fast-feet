import { Injectable } from "@nestjs/common";
import { Role, Users } from "@prisma/client";
import { CpfInvalidError } from "src/erros/cpf-invalid.error";
import { UserAlreadyExistsError } from "src/erros/user-already-exists.error";
import { HashEncoder } from "src/interface/cryptography/hash-encoder.interface";
import { UserInterface } from "src/interface/user.interface";

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