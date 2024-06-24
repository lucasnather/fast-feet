import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvSchema } from "src/env/env";
import z from "zod";

const tokenPayloadschema = z.object({
  sub: z.string(),
  role: z.enum(['admin', 'deliveryMan']).default('deliveryMan'),
})

type UserPayloadType = z.infer<typeof tokenPayloadschema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService<EnvSchema, true>) {
      const secretKey = config.get('JWT_SECRET_KEY',  { infer: true})

        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey:  secretKey,
          ignoreExpiration: false,
        });
      }

      async validate(payload: UserPayloadType) {
        return tokenPayloadschema.parse(payload)
      }
}