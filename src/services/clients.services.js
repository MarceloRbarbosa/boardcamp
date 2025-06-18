import clientsRepository from "../repositories/clients.repository.js"

async function getClientsServices() {
    const customers = await clientsRepository.findAllClients()
    return customers;
}

async function getClientsByIdServices(id) {
    const customers = await clientsRepository.findClientById(id);
    
    if(!customers) {
        throw { type: "not_found", message:"Cliente não encontrado."};
    }
    return customers;
}

async function createClientServices({name, phone, cpf}) {
    const conflict = await clientsRepository.findClientByCpf(cpf);
    if(conflict){
        throw { type : "conflict", message: "CPF já cadastrado"}
    }

    await clientsRepository.insertClient({name, phone, cpf})
}

const clientsServices = {
    getClientsServices,
    getClientsByIdServices,
    createClientServices
}

export default clientsServices;