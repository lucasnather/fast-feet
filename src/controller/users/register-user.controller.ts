import { BadRequestException, Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserAlreadyExistsError } from "../../erros/user-already-exists.error.js";
import { ZodValidationPipe } from "../../pipe/zod-validation.pipe.js";
import { CreateUserService } from "../../service/create-user.service.js";
import { z } from "zod";
import { CpfInvalidError } from "../../erros/cpf-invalid.error.js";

const registerUserBodySchema = z.object({
    name: z.string(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
        message: 'Formato do cpf deve ser XXX.XXX.XXX-XX'
    }),
    password: z.string().min(8, 'Senha com no mínimo 8 caracteres'),
    city: z.string(),
    role: z.enum(['admin', 'deliveryMan']).optional().default('deliveryMan'),
})

type RegisterUserBody = z.infer<typeof registerUserBodySchema>

@Controller('/api/users/register')
export class RegisterUserController {

    constructor(
        private createUserService: CreateUserService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(registerUserBodySchema))
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
            if(e instanceof CpfInvalidError || e instanceof UserAlreadyExistsError) {
                throw new BadRequestException({
                    message: e.message
                })
            }
        }

    }
}