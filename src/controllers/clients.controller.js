import clientsServices from "../services/clients.services.js"

export async function getClients(req, res){
    const customers = await clientsServices.getClientsServices();
    res.send(customers)
}

export async function getClientsById(req, res ) {
    const {id} = req.params
    const customers = await clientsServices.getClientsByIdServices(id);
    res.send(customers)
}

export async function createNewClient (req, res) {
    const {name, phone, cpf} = req.body
        await clientsServices.createClientServices({name, phone, cpf});
        res.status(201).send("Cliente cadastrado com sucesso!")
    
}