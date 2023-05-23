const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllgetAllPlanets(req, res){
    return res.status(200).json(getAllPlanets())
    // return res.status(200).json(getAllLaunches())
}

module.exports = httpGetAllgetAllPlanets;