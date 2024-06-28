import { Injectable } from "@nestjs/common";
import pkg from "bcryptjs";
import { HashCompare } from "../../interface/cryptography/hash-compare.interface.js";
import { HashEncoder } from "../../interface/cryptography/hash-encoder.interface.js";

@Injectable()
export class HashRepository implements HashEncoder, HashCompare {
    private ROUNDS: number = 8

    async hashPassword(plain: string): Promise<string> {
        return await pkg.hash(plain, this.ROUNDS)
    }

    async comparePassword(plain: string, dbPassoword: string): Promise<boolean> {
        return await pkg.compare(plain, dbPassoword)
    }

}