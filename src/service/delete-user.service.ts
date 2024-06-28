import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { ResourceNotFoundError } from "src/erros/resource-not-found.error";
import { UserInterface } from "src/interface/user.interface";

interface DeleteUserRequest {
    id: string
}

interface DeleteUserResponse {
    message: string
}

@Injectable()
export class DeleteUserService {

    constructor(
        private userInterface: UserInterface
    ) {}

    async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
        const findUserById = await this.userInterface.findById(id)

        if(!findUserById) throw new ResourceNotFoundError()

        const users = await this.userInterface.deleteById(id)

        return {
            message: `Delevery Man ${findUserById.name} deleted`
        }
    }
}