import { Router } from "express";
import { createNewRental, deleteRental, getRentals, returnRental } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", createNewRental)
rentalsRouter.post("/rentals/:id", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)


export default rentalsRouter;