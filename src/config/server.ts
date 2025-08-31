import express, { type Application } from "express";
import { Server as HttpServer } from "http";

import { Server as SocketIOServer } from "socket.io";

import { envConfig } from "./env";
import { connectDatabase } from "./orm";

import {
    authRouter,
    usuarioRouter,
    rolRouter,
    saldoRouter,
    tipoTransporteRouter,
    transporteRouter,
    viajeRouter,
} from "../routes";

import {
    logErrors,
    errorHandler,
    boomErrorHandler,
    uniqueConstraintErrorHandler,
} from "../middlewares/erroHandler";

import cors from "cors";

import "../helpers/auth";

export class Server {
    public app: Application;
    public port: number;
    public io: SocketIOServer;
    public httpServer: HttpServer;
    public paths: { [key: string]: string };
    constructor() {
        this.app = express();
        this.port = envConfig.port;

        this.paths = {
            usuarios: "/api/usuarios",
            auth: "/api/auth",
            rol: "/api/rol",
            saldo: "/api/saldo",
            tipoTransporte: "/api/tipo-transporte",
            transporte: "/api/transporte",
            viaje: "/api/viaje",
        };
        this.middlewares();
        this.dbConection();
        this.routes();

        this.httpServer = new HttpServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: { origin: "*" },
        });

        this.io.on("connection", (socket) => {
            console.log("Usuario conectado", socket.id);

            socket.on("join", (payload) => {
                const sala =
                    typeof payload === "string"
                        ? payload
                        : (payload && payload.sala) || "";

                if (!sala) {
                    console.log("join sin sala válida:", payload);
                    return;
                }

                socket.join(sala);
                console.log(`Socket ${socket.id} unido a sala ${sala}`);
                socket.emit("joined", sala);
            });

            socket.on("disconnect", () => {
                console.log("Usuario desconectado", socket.id);
            });
        });
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
        this.app.use(this.paths.usuarios!, usuarioRouter);
        this.app.use(this.paths.auth!, authRouter);
        this.app.use(this.paths.rol!, rolRouter);
        this.app.use(this.paths.saldo!, saldoRouter);
        this.app.use(this.paths.tipoTransporte!, tipoTransporteRouter);
        this.app.use(this.paths.transporte!, transporteRouter);
        this.app.use(this.paths.viaje!, viajeRouter);

        this.app.use(logErrors);
        this.app.use(boomErrorHandler);
        this.app.use(uniqueConstraintErrorHandler);
        this.app.use(errorHandler);
    }

    public listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
