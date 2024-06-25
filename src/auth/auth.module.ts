import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { EnvSchema } from "src/env/env";
import { JwtStrategy } from "./jwt-strategy.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<EnvSchema, true>) {
                const secretKey = config.get('JWT_SECRET_KEY',  { infer: true})

                return {
                    secret: secretKey
                }
            }
        })
    ],
    providers: [
        JwtStrategy, 
        JwtAuthGuard
    ],
    exports: [JwtModule, PassportModule]
})
export class AuthModule {}