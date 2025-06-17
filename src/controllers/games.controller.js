


export async function getGames(req, res) {
    try {
        res.send("get games")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGame(req, res) {
     try {
        res.send("create games")
    } catch (err) {
        res.status(500).send(err.message)
    }
}