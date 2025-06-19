import connection from "../database/db.connections.js"

async function findAllGames() {
    const games = await connection.query(`SELECT * FROM games ORDER BY id`);
    return games.rows
}

async function findGamesByName(name){
    const game = await connection.query(`SELECT * FROM games WHERE name = $1`, [name]);
    return game.rows[0];
}

async function findGamesByID(id){
    const game = await connection.query(`SELECT * FROM games WHERE id = $1`, [id]);
    return game.rows[0];
}

async function insertGame({ name, image, stockTotal, pricePerDay}) {
    const game = await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3,$4)`,
    [name, image, stockTotal, pricePerDay]);
}


const gamesRepository = {
    findAllGames,
    findGamesByName,
    insertGame,
    findGamesByID
}

export default gamesRepository;