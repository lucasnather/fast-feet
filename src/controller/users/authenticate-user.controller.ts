import { InvalidCredentialsError } from "../../erros/invalid-credentials.error.js";
import { ZodValidationPipe } from "../../pipe/zod-validation.pipe.js";
import { AuthenticateUserService } from "../../service/authenticate-user.service.js";
import { BadRequestException, Body, Controller, Post, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import z from "zod";

const authenticateBodySchema = z.object({
    cpf: z.string(),
    password: z.string()
})

type AuthenticateBodyType = z.infer<typeof authenticateBodySchema>

@Controller("/api/users/authenticate")
export class AuthenticateUserController {

    constructor(
        private jwt: JwtService,
        private authenticateUserService: AuthenticateUserService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async post(@Body() body: AuthenticateBodyType) {
        const { cpf, password } = body

        try {
            const { users } = await this.authenticateUserService.execute({
                cpf,
                password
            })

            const roles = [users.role]

            const token = this.jwt.sign({
                sub: users.id,
                roles
            })

            return {
                accessToken: token
            }
        } catch(e) {
            if(e instanceof InvalidCredentialsError) {
                throw new BadRequestException({
                    message: e.message
                })
            }
        }
    }
}