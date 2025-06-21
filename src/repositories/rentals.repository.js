import connection from "../database/db.connections.js";


async function findAllRentals() {
    const rentals = await connection.query(`
    SELECT rentals.*, 
        customers.id AS "customerId", 
        customers.name AS "customerName", 
        games.id AS "gamesId", 
        games.name AS "gamesName"
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id
	JOIN games ON rentals."gameId" = games.id`)
    return rentals.rows;
}

async function findRentalById(id) {
    const rentals = await connection.query(`SELECT * FROM rentals WHERE id =$1`, [id]);
    return rentals.rows[0]
}

async function countRentals(gameId) {
    const result = await connection.query(`
        SELECT COUNT(*) FROM rentals
        WHERE "gameId" =$1 AND "returnDate" IS NULL 
        `, [gameId])

        return Number(result.rows[0].count)
}
async function insertNewRent({ customerId, gameId, rentDate, daysRented, originalPrice}) {
    await connection.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
        VALUES ($1, $2, $3, $4, $5)
        `, [customerId, gameId, rentDate, daysRented, originalPrice])
}

async function returnRent(id, returnDate, delayFee) {
    await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" =$2 WHERE id = $3
    `, [returnDate, delayFee, id]

    )   
}

async function deleteRental(id) {
    await connection.query(`DELETE FROM rentals WHERE id=$1`, [id])
}


const rentalsRepository = {
    findAllRentals,
    findRentalById,
    insertNewRent,
    countRentals,
    returnRent,
    deleteRental
}

export default rentalsRepository;