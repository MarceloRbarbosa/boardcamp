import gamesRepository from "../repositories/games.repository.js";

async function getGamesService() {
    const games = await gamesRepository.findAllGames()
    return games
}

async function createGamesService({ name, image, stockTotal, pricePerDay }) {
    const conflict = await gamesRepository.findGamesByName(name);
    if(conflict){
        throw { type: "conflict", message: "Já existe um cadastro para esse jogo"}
    }

    await gamesRepository.insertGame({name, image, stockTotal, pricePerDay})
}


const gamesService = {
    getGamesService,
    createGamesService
}

export default gamesService;