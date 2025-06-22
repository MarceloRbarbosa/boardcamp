import rentalsServices from "../services/rentals.services.js"

export async function getRentals(req, res){
        const rentals = await rentalsServices.getRentalServices();
        res.send(rentals)
}

export async function createNewRental(req, res){
    const { customerId, gameId, daysRented } = req.body;
        await rentalsServices.createRentalServices( {customerId, gameId, daysRented} )
        res.status(201).send("Aluguel registrado com sucesso!")
}

export async function finishRental(req, res){
    const { id } = req.params
        await rentalsServices.finishRentalService(id);
        res.send("Aluguel finalizado com sucesso!")
}

export async function deleteRental(req, res){
    const { id } = req.params
        await rentalsServices.deleteRentalService(id);
        res.send("Aluguel deletado com sucesso!")  
}
