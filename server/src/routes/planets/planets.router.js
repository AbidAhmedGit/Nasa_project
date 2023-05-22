const express = require('express');
const getAllPlanets = require('./planets.controller');

planetsRouter = express.Router();
planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;