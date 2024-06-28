import { InvalidCredentialsError } from "../erros/invalid-credentials.error.js"
import { HashCompare } from "../interface/cryptography/hash-compare.interface.js"
import { UserInterface } from "../interface/user.interface.js"
import { Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"

interface AuthenticateUserRequest {
    cpf: string
    password: string
}

interface AuthenticateUserResponse {
    users: Users
}

@Injectable()
export class AuthenticateUserService {

    constructor(
        private userInterface: UserInterface,
        private hashCompare: HashCompare
    ) {}

    async execute({ cpf,password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const users = await this.userInterface.findByCPF(cpf)

        const userNotFound = !users

        if(userNotFound) throw new InvalidCredentialsError()

        const comparePassword = await this.hashCompare.comparePassword(password, users.password)

        if(!comparePassword) throw new InvalidCredentialsError()

        return {
            users
        }
    }
}