import {  BadRequestException, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard.js";
import { Roles } from "../../auth/role.decorator.js";
import { CpfInvalidError } from "../../erros/cpf-invalid.error.js";
import { ResourceNotFoundError } from "../../erros/resource-not-found.error.js";
import { UpdateUserService } from "../../service/update-user.service.js";
import { UserProps, UserUpdate } from "../decorator/user.decorator.js";


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