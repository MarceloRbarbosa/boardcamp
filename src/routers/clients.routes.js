import { Router } from "express";
import { createNewClient, getClients, getClientsById } from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { clientSchema } from "../schemas/clients.schemas.js";


const clientsRouter = Router()

clientsRouter.get("/clients", getClients)
clientsRouter.get("/clients/:id", getClientsById)
clientsRouter.post("/clients", validateSchema(clientSchema), createNewClient)

export default clientsRouter;