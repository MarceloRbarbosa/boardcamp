import dayjs from "dayjs";
import clientsRepository from "../repositories/clients.repository";
import gamesRepository from "../repositories/games.repository";
import rentalsRepository from "../repositories/rentals.repository";


async function getRentalServices(){
    const rentals = await rentalsRepository.findAllRentals();
    return rentals;
}

async function createRentalServices({game, customerId, gameId, daysRented}) {
    const existingCustomer = clientsRepository.findClientById(customerId)
    if(!existingCustomer){
        throw { type: "not_found", message:"Cliente não encontrado"}
    }

    const existingGame = gamesRepository.findGamesByID(gameId)
    if(!existingGame){
        throw { type: "not_found", message:"Jogo não encontrado"}
    }

    const openRentals = await rentalsRepository.countRentals(gameId);
    if(openRentals >= game.stockTotal) {
        throw {type: "conflict", message: "Jogo sem estoque disponivel"}
    }

    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = game.pricePerDay * daysRented;

    await rentalsRepository.insertNewRent({
        customerID,
        gameId,
        rentDate,
        daysRented,
        originalPrice
    });
}

async function returnRentalService(id) {
    
    
}
const rentalsServices = {
    getRentalServices,
    createRentalServices
}