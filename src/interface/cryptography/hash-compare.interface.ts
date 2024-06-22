import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class HashCompare {
    abstract comparePassword(plain: string, dbPassoword: string): Promise<boolean>
}