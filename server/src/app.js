const express = require('express');
const planets = require('./models/planets.model');
const planetsRouter = require('./routes/planets/planets.router');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3006'
}));

app.use(express.json());
app.use(planetsRouter);

module.exports = app;