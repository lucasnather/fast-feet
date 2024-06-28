import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "../erros/resource-not-found.error.js";
import { UserInterface } from "../interface/user.interface.js";

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