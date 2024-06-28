import {  BadRequestException, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { CpfInvalidError } from "src/erros/cpf-invalid.error";
import { ResourceNotFoundError } from "src/erros/resource-not-found.error";
import { UpdateUserService } from "src/service/update-user.service";
import { UserProps, UserUpdate } from "../decorator/user.decorator";


@Controller('/api/users/:id')
export class UpdateUserController {

    constructor(
        private updateUserService: UpdateUserService
    ) {}

    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    @Put()
    async put( @Param('id') id: string, @UserUpdate() req: UserProps) {
        
        const { city, cpf, name, password, role } = req

        try {
            const { users } = await this.updateUserService.execute({
                cpf,
                password,
                city,
                name,
                role,
                id
            })

            return {
                users
            }
        } catch(e) {
            if(e instanceof ResourceNotFoundError || e instanceof CpfInvalidError) {
                throw new BadRequestException({
                    message: e.message
                })
            }

           
        }
    }
}