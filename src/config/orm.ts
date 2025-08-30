import "reflect-metadata";
import { DataSource } from "typeorm";
import { envConfig } from "./env";
import { configEntities, configMigrations } from "../db/configDb";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envConfig.dbHost ?? "",
    port: envConfig.dbPort,
    username: envConfig.dbUser,
    password: envConfig.dbPassword,
    database: envConfig.dbName ?? "",
    synchronize: false,
    logging: false,
    entities: configEntities,
    migrations: configMigrations,
    subscribers: [],
});

export async function connectDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        console.log(
            "Entities:",
            AppDataSource.entityMetadatas.map((e) => e.name)
        );
    } catch (err) {
        console.error("Error during Data Source initialization", err);
    }
}

export async function migrationRun() {
    try {
        await AppDataSource.runMigrations();
        return "Migrations have been run!";
    } catch (err) {
        return `Error during migrations run : ${err}`;
    }
}
