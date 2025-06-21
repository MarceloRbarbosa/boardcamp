import rentalsServices from "../services/rentals.services.js"

export async function getRentals(req, res){
     try {
        const rentals = await rentalsServices.getRentalServices();
        res.send(rentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createNewRental(req, res){
    const { customerId, gameId, daysRented } = req.body;

     try {
        await rentalsServices.createRentalServices( {customerId, gameId, daysRented} )
        res.status(201).send("Aluguel registrado com sucesso!")
    } catch (err) {
        if (err.type === "not_found") return res.status(404).send(err.message);
        if (err.type === "unprocessable_entity") return res.status(422).send(err.message);
        if (err.type === "conflict") return res.status(409).send(err.message);
        res.status(500).send(err.message)
    }
}

export async function finishRental(req, res){
    const { id } = req.params
     try {
        await rentalsServices.finishRentalService(id);
        res.send("Aluguel finalizado com sucesso!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res){
    const { id } = req.params
     try {
        await rentalsServices.deleteRentalService(id);
        res.send("Aluguel deletado com sucesso!")
    } catch (err) {
       if (err.type === "not_found") return res.status(404).send(err.message);
       if (err.type === "unprocessable_entity") return res.status(422).send(err.message);
        res.status(500).send(err.message);
    }
}
