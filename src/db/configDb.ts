import { envConfig } from "../config/env";
export const configEntities = [
    envConfig.nodeEnv === "production"
        ? "dist/entities/*.js"
        : "src/entities/*.ts",
];

export const configMigrations = [
    envConfig.nodeEnv === "production"
        ? "dist/db/migrations/*.js"
        : "src/db/migrations/*.ts",
];
