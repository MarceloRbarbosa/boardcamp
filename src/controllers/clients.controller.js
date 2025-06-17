export async function getClients(req, res){
     try {
        res.send("get clients")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getClientsById(req, res ) {
     try {
        res.send("get clientById")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createNewClient (req, res) {
     try {
        res.send("Create new Client")
    } catch (err) {
        res.status(500).send(err.message)
    }
}