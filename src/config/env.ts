import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
    port: Number(process.env.PORT),
    dbUser: String(process.env.DB_USER),
    dbPassword: String(process.env.DB_PASS),
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: Number(process.env.DB_PORT),
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: String(process.env.JWT_SECRET),
    jwtSecretRecovery: String(process.env.JWT_SECRET_RECOVERY),
    googleClientId: String(process.env.GOOGLE_CLIENT_ID),
    googleClientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
};
