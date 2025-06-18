import { Router } from "express";
import { createNewRental, deleteRental, getRentals, returnRental } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals",validateSchema(rentalSchema), createNewRental)
rentalsRouter.post("/rentals/:id/return",validateSchema(rentalSchema), returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)


export default rentalsRouter;