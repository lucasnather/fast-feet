import { compare, hash } from "bcryptjs";
import { HashCompare } from "src/interface/cryptography/hash-compare.interface";
import { HashEncoder } from "src/interface/cryptography/hash-encoder.interface";

export class HashRepository implements HashEncoder, HashCompare {
    private ROUNDS: number = 8

    async hashPassword(plain: string): Promise<string> {
        return await hash(plain, this.ROUNDS)
    }

    async comparePassword(plain: string, dbPassoword: string): Promise<boolean> {
        return await compare(plain, dbPassoword)
    }

}