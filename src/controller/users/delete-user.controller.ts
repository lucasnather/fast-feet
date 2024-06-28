import { JwtAuthGuard } from "../../auth/jwt-auth.guard.js";
import { Roles } from "../../auth/role.decorator.js";
import { ResourceNotFoundError } from "../../erros/resource-not-found.error.js";
import { DeleteUserService } from "../../service/delete-user.service.js";
import { BadRequestException, Controller, Delete, Param, UseGuards } from "@nestjs/common";


@Controller("/api/users/:id")
export class DeleteUserController {

    constructor(
        private deleteUserService: DeleteUserService
    ) {}

    @Delete()
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {

        try {
            const { message } = await this.deleteUserService.execute({
                id
            })

            return {
                message
            }
        } catch(e) {
            if(e instanceof ResourceNotFoundError) {
                throw new BadRequestException({
                    message: e.message
                })
            }

            
        }
    }
}