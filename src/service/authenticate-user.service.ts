import { Users } from "@prisma/client"
import { InvalidCredentialsError } from "src/erros/invalid-credentials.error"
import { HashCompare } from "src/interface/cryptography/hash-compare.interface"
import { UserInterface } from "src/interface/user.interface"

interface AuthenticateUserRequest {
    cpf: string
    password: string
}

interface AuthenticateUserResponse {
    users: Users
}

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