const path = require('path');
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
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;