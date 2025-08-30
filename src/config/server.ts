import express, { type Application } from "express";

import { envConfig } from "./env";
import { connectDatabase } from "./orm";
import cors from "cors";

export class Server {
    public app: Application;
    public port: number;
    public paths: { [key: string]: string };
    // private fileManeger: FileManager;
    constructor() {
        this.app = express();
        this.port = envConfig.port;

        this.paths = {
            usuarios: "/api/usuarios",
        };
        this.middlewares();
        this.dbConection();
        this.routes();
        // this.setupSwagger();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private async dbConection() {
        await connectDatabase();
    }

    private routes() {
        // this.app.use(this.paths.users, userRouter);
        // this.app.use(this.paths.persons, personRouter);
        // this.app.use(this.paths.auth, authRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
