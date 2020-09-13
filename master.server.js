const cluster = require('cluster');
const os = require('os');
const cpus = os.cpus().length;

if (cluster.isMaster) {
    cluster.on('online', (server) => {
        console.log('Server with id ', server.id, ' is now online');
    });
    cluster.on('exit', (server) => {
        console.log('Server with id ', server.id, ' is now Dead');
        cluster.fork();
    });
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
} else {
    require('./server').server;
}