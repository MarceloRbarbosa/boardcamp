import connection from "../database/db.connections.js";


async function findAllRentals(params) {
    const rentals = await connection.query(`SELECT * FROM rentals ORDER BY id`)
    return rentals.rows;
}

async function findRentalById(id) {
    const rental = await connection.query(`SELECT * FROM rentals WHERE id =$1`, [id]);
    return rentals.rows[0]
}

async function countRentals(gameId) {
    const count = await connection.query(`
        SELECT COUNT(*) FROM rentals
        WHERE "gameID" =$1 AND "returnDate" IS NULL 
        `, [gameId])
}
async function insertNewRent({ customerID, gameID, rentDate, daysRented, originalPrice}) {
    await connection.query(`
        INSERT INTO rentals ("customerID", "gameId", "rentDate", "daysRented", "originalPrice")
        VALUES ($1, $2, $3, $4, $5)
        `, [customerID, gameID, rentDate, daysRented, originalPrice])
}

async function returnRent(id, returnDate, delayFee) {
    await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" =$2, WHERE id = $3
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