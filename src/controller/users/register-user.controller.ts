import { Body, Controller, Post } from "@nestjs/common";
import { CpfInvalidError } from "src/erros/cpf-invalid.error";
import { UserAlreadyExistsError } from "src/erros/user-already-exists.error";
import { CreateUserService } from "src/service/create-user.service";
import { z } from "zod";

const registerUserBodySchema = z.object({
    name: z.string(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
        message: 'Formato do cpf deve ser XXX.XXX.XXX-XX'
    }),
    password: z.string(),
    city: z.string(),
    role: z.enum(['admin', 'deliveryMan']).optional().default('deliveryMan'),
})

type RegisterUserBody = z.infer<typeof registerUserBodySchema>

@Controller('/api/register')
export class RegisterUserController {

    constructor(
        private createUserService: CreateUserService
    ) {}

    @Post()
    async post(@Body() body: RegisterUserBody) {
        const { city, cpf, name, password, role } = body

        try {
            const { users } = await this.createUserService.execute({
                city,
                cpf,
                name,
                password,
                role
            })

            return {
                users
            }
        } catch(e) {
            if(e instanceof CpfInvalidError) return e.message

            if(e instanceof UserAlreadyExistsError) return e.message

           return 'Internal Server Error'
        }

    }
}