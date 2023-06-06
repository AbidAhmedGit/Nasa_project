const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllgetAllPlanets(req, res){
    return res.status(200).json(await getAllPlanets())
    // return res.status(200).json(getAllLaunches())
}

module.exports = httpGetAllgetAllPlanets;