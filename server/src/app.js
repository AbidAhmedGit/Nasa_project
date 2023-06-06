const path = require('path');
const express = require('express');
const planets = require('./models/planets.model');
const planetsRouter = require('./routes/planets/planets.router');
const cors = require('cors');
const morgan = require('morgan');
const { launchesRouter } = require('./routes/launches/launches.router');
const app = express();


// ------------------MW---------------------------------------------

app.use(cors({
    origin: 'http://localhost:3006'
}));

// logging middleware- morgan
app.use((morgan('combined')));

app.use(express.json());

// routing MW
app.use(planetsRouter);
app.use('/launches', launchesRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;