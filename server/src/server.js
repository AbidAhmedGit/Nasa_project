const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const MONGO_URL = "mongodb+srv://nasa-api:vpvTww4UAxmd9WBI@nasacluster.chau3w2.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', ()=>{
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err)=>{
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);    
    await loadPlanetsData();
    server.listen(port, ()=>{
        console.log('server listening on port: ', port);
    })
}

startServer();