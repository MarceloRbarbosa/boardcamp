export async function getRentals(req, res){
     try {
        res.send("get Rentals")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createNewRental(req, res){
     try {
        res.send("new")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function returnRental(req, res){
     try {
        res.send("return")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res){
     try {
        res.send("delete")
    } catch (err) {
        res.status(500).send(err.message)
    }
}
