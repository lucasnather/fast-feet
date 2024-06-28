import { Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { ResourceNotFoundError } from "src/erros/resource-not-found.error";
import { DeleteUserService } from "src/service/delete-user.service";

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
                return {
                    message: e.message
                }
            }

             return 'Internal Server Error'
        }
    }
}