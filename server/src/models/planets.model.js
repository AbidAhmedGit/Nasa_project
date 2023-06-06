const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');
const habitablePlanets = [];


function isHabitablePlanets(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 
    && planet['koi_prad']<1.6;
    
};

// function isHabitablePlanets(planet) {
    //     return planet['koi_disposition'] === 'CONFIRMED'
    //       && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    //       && planet['koi_prad'] < 1.6;
    //   }
    
function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'));
        stream
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async (data)=>{
            if (isHabitablePlanets(data)){
                // habitablePlanets.push(data);
                // planets.create(data);
                // replace create with insert + update = upsert
                // await planets.create({
                //     keplerName: data.kepler_name,
                // })
                savePlanet(data);
            }
        })
    
        .on('error', (error)=>{
            console.log(error)
            reject(error)
        })
        .on('end', async ()=>{
            console.log();
            console.log(
                habitablePlanets.map((planet)=>{
                    // console.log(planet['kepler_name'])
                    return planet['kepler_name']
                })
            );
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        });
    });
};

async function getAllPlanets() {
    // explore all the possible queries
    return await planets.find({}, {
      '_id': 0, '__v': 0,
    });
}

async function savePlanet(planet) {
    try {
      await planets.updateOne({
        keplerName: planet.kepler_name,
      }, {
        keplerName: planet.kepler_name,
      }, {
        upsert: true,
      });
    } catch(err) {
      console.error(`Could not save planet ${err}`);
    }
}
  

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};