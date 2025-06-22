export default function errorHandler(err, req,res, next){

    if(err.type === "not_found") return res.status(404).send(err.message)
    if(err.type === "conflict") return res.status(409).send(err.message)
    if (err.type === "unprocessable_entity") return res.status(422).send(err.message);

    res.status(500).send(err.message)
}