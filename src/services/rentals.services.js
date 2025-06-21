import dayjs from "dayjs";
import clientsRepository from "../repositories/clients.repository.js";
import gamesRepository from "../repositories/games.repository.js";
import rentalsRepository from "../repositories/rentals.repository.js";


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

async function finishRentalService(id) {
    const rental = await rentalsRepository.findRentalById(id);
    if(!rental){
        throw { type: "not_found", message: "Aluguel não encontrado"}
    }

    if(rental.returnDate){
        throw { type: "unprocessable_entity", message: "Aluguel já finalizado"}
    }
    
    const returnDate = dayjs();
    const rentDate = dayjs(rental.rentDate);
    const daysPassed = returnDate.diff(rentDate, 'day');
    const delayDays = daysPassed - rental.daysRented;

    let delayFee = 0;
    if ( delayFee > 0 ) {
        const game = await gamesRepository.findGamesByID(rental.gameId);
        delayFee = delayDays * game.pricePerDay;
    }

    await rentalsRepository.returnRent(
        id,
        returnDate.format("YYYY-MM-DD"),
        delayFee
         );
}

async function  deleteRentalService(id) {
const rental = await rentalsRepository.deleteRental();
 if (!rental) {
    throw { type: "not_found", message: "Aluguel não encontrado" };
  }

  if (rental.returnDate !== null) {
    throw { type: "unprocessable_entity", message: "Não é possível deletar um aluguel já finalizado" };
  }

  await rentalRepository.deleteRental(id);
}



const rentalsServices = {
    getRentalServices,
    createRentalServices,
    finishRentalService,
    deleteRentalService
}

export default rentalsServices;