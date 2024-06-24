import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().default(8080),
    DATABASE_URL: z.string().url(),
    JWT_PUBLIC_KEY: z.string(),
    JWT_PRIVATE_KEY: z.string(),
    JWT_SECRET_KEY: z.string(),
})

export type EnvSchema = z.infer<typeof envSchema>