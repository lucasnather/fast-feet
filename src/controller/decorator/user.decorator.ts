import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Role } from "@prisma/client";

export interface UserProps {
    name?: string | null
    cpf?: string | null
    password?: string | null
    city?: string | null
    role?: Role | null
}

export const UserUpdate = createParamDecorator((_: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()

    return req.body as UserProps
})