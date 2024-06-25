import { Body, Controller, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ZodValidationPipe } from "src/pipe/zod-validation.pipe";
import { UpdateUserService } from "src/service/update-user.service";
import z from "zod";

const updateBodySchema = z.object({
    cpf: z.string().nullable(),
    password: z.string().nullable(),
    name: z.string().nullable(),
    city: z.string().nullable(),
    role: z.enum(['admin', 'deliveryMan']).nullable().default('deliveryMan'),
})

type UpdateBodyType = z.infer<typeof updateBodySchema>

@Controller("/api/users/update/:userId")
export class UpdateUserController {

    constructor(
        private updateUserService: UpdateUserService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(updateBodySchema))
    async post(@Param('userId') userId: string, @Body() body: UpdateBodyType) {
        const { cpf, password, role, city, name } = body

        try {
            const { users } = await this.updateUserService.execute({
                cpf,
                password,
                city,
                name,
                role,
                id: userId
            })

            return {
                users
            }
        } catch(e) {

            return 'Internal Server Error'
        }
    }
}