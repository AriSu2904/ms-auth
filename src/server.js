import express from "express";
import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import userResolvers from "./graphql/resolvers/userResolvers.js";
import {typeDefsList} from "./graphql/index.js";
import {dbInitializer} from "./database/initializer.js";
import mongoose from "mongoose";
import {config} from "../config/index.js";
import {container, setUp} from "./awilix/config.js";
import cors from "cors";

setUp();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: typeDefsList,
    resolvers: userResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    introspection: true
});

await server.start();

app.use('/graphql',
    express.json(),
    cors(),
    expressMiddleware(server, {
        context: async ({req, res}) => {
            const userService = container.resolve('userService');
            return {
                req,
                res,
                userService
            }
        }
    })
);
await dbInitializer(mongoose);
await new Promise((resolve) => httpServer.listen({ port: config.SERVER_PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${config.SERVER_PORT}/graphql`);