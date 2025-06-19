import gamesService from "../services/games.services.js"



export async function getGames(req, res) {
    try {
        const games = await gamesService.getGamesService();
        res.send(games)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body
     try {
        await gamesService.createGamesService({name, image, stockTotal, pricePerDay});
        res.status(201).send("Jogo cadastrado com sucesso!");
    } catch (err) {
        if(err.type === "conflict") return res.status(409).send(err.message);
        res.status(500).send(err.message);
    }
}