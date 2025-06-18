import clientsServices from "../services/clients.services.js"




export async function getClients(req, res){
     try {
        const customers = await clientsServices.getClientsServices();
        res.send(customers)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getClientsById(req, res ) {
    const {id} = req.params
     try {
        const customers = await clientsServices.getClientsByIdServices(id);
        res.send(customers)
    } catch (err) {
        if(err.type === "not_found") return res.status(404).send(err.message)
        res.status(500).send(err.message)
    }
}

export async function createNewClient (req, res) {
    const { name, phone, cpf} = req.body
     try {
        await clientsServices.createClientServices({name, phone, cpf});
        res.status(201).send("Cliente cadastrado com sucesso!")
    } catch (err) {
        if(err.type === "conflict") return res.status(409).send(err.message)
        res.status(500).send(err.message)
    }
}