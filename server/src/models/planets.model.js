const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

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
        .on('data', (data)=>{
            if (isHabitablePlanets(data)){
                habitablePlanets.push(data);
            }
        })
    
        .on('error', (error)=>{
            console.log(error)
            reject(error)
        })
        .on('end', ()=>{
            console.log();
            console.log(
                habitablePlanets.map((planet)=>{
                    // console.log(planet['kepler_name'])
                    return planet['kepler_name']
                })
            );
            console.log(`${habitablePlanets.length} habitable planets were found!`)
            resolve();
        });
    });
};

function getAllPlanets(){
    return habitablePlanets
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};