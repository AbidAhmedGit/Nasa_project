const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const launches = new Map();
let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler-Exploration X',
    rocket: 'Explorer ISI',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-4426',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);
// launches.get(100) === launch;

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
    // returns the first document
      .findOne()
    //   sort descending by flightNumber highest to lowest
      .sort('-flightNumber');
    // the first document will have the highest flightNumber
  
    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }
  
    return latestLaunch.flightNumber;
  }
  

async function getAllLaunches(){
    // return Array.from(launches.values())
    return await launchesDatabase.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

async function saveLaunch(launch) {
    const planet = planets.findOne({
        keplerName: launch.target,
    })
    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    });

    if (!planet) {
        throw new Error('No matching planet found');
    }
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
  
    if (!planet) {
      throw new Error('No matching planet found');
    }
  
    const newFlightNumber = await getLatestFlightNumber() + 1;
  
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: newFlightNumber,
    });
  
    await saveLaunch(newLaunch);
  }

// async function existsLaunchWithId(launchId) {
async function existsLaunchWithId(launchId) {
    // return await findLaunch({
    //   flightNumber: launchId,
    // });
    // return launches.has(launchId)
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
  }

// async function abortLaunchById(launchId) {
async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    
    return aborted.modifiedCount === 1;
}

  

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}