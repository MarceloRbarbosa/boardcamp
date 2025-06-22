import gamesService from "../services/games.services.js"



export async function getGames(req, res) {  
    const games = await gamesService.getGamesService();
    res.send(games)
}

export async function createGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body
        await gamesService.createGamesService({name, image, stockTotal, pricePerDay});
        res.status(201).send("Jogo cadastrado com sucesso!");
}