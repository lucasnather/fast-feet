import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from "./jwt-strategy.strategy.js";
import { JwtAuthGuard } from "./jwt-auth.guard.js";
import { EnvSchema } from "@/env/env.js";



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