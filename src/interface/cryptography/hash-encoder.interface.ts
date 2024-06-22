import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class HashEncoder {
    abstract hashPassword(plain: string): Promise<string>
}