const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler-Exploration X',
    rocket: 'Explorer ISI',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-4426',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);
// launches.get(100) === launch;

function getAllLaunches(){
    return Array.from(launches.values())
}

module.exports = {
    getAllLaunches,
}