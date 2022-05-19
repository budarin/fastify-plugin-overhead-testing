const { networkInterfaces } = require('node:os');

// const { log } = console;
// log(networkInterfaces());

/**
 * It returns the first IP address of the first network interface that has an IP address
 * @returns The IP address of the machine.
 */
function getIP() {
    const ni = networkInterfaces();

    const eth0 = ni['eth0'] || ni['lo0'];

    if (eth0 && eth0?.[0]?.address) {
        return eth0[0].address;
    }

    return;
}

module.exports = {
    ip: getIP(),
};
