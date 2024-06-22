import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserService } from "src/service/create-user.service";
import { z } from "zod";

const registerUserBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
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
           return 'Internal Server Error'
        }

    }
}