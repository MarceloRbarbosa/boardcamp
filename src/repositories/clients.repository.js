import connection  from "../database/db.connections.js"

async function findAllClients() {
    const customers = await connection.query(`SELECT * FROM customers`)
    return customers.rows
}

async function findClientById(id) {
    const customers = await connection.query(`SELECT * FROM customers WHERE id =$1`, [id])
    return customers.rows[0];
}

async function findClientByCpf(cpf) {
    const customers = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
    return customers.rows[0];
}

async function insertClient({name, phone, cpf}){
    const customers = await connection.query(`
        INSERT INTO customers (name, phone, cpf)
         VALUES ($1, $2, $3);`
         ,[name, phone, cpf]);
}


const clientsRepository = {
    findAllClients,
    findClientById,
    findClientByCpf,
    insertClient
}

export default clientsRepository;