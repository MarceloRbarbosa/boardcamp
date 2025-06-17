import { Router } from "express";
import { createNewClient, getClients, getClientsById } from "../controllers/clients.controller.js";


const clientsRouter = Router()

clientsRouter.get("/clients", getClients)
clientsRouter.get("/clients/:id", getClientsById)
clientsRouter.post("/clients", createNewClient)

export default clientsRouter;