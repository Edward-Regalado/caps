'use strict';

// Main Hub Application - this listening for all events

const io = require('./events.js');

const { createPackage } = require('./vendor.js');
// const { pickUp, inTransit, delivered } = require('./driver.js');

function start() {
    io.on('connection', (client) => {
        // client.on('start', (payload) => {
        //     io.emit('new-store', createPackage(payload));
        // });
        client.on('new-package', (payload) => {
            io.emit('new-package-for-delivery', payload);
        });
        client.on('driver-picked-up', (payload) => {
            logEvents(payload, 'pickup');
            io.emit('confirmation-pickUp', payload);
        });
        client.on('driver-in-transit', (payload) => {
            logEvents(payload, 'in-transit');
            io.emit('confirmation-in-transit', payload);
        });
        client.on('driver-delivered', (payload) => {
            logEvents(payload, 'delivered');
            io.emit('confirmation-delivery', payload);
        });
    });
};

function logEvents(payload, str){
    const date = Date.now();
    const today = new Date(date).toUTCString();
    console.log(`
        EVENT: {\n
            event: "${str}",\n
            time: "${today}",\n
            payload: {\n
                store: "${payload.store}", \n
                orderId: "${payload.orderId}", \n
                customer: "${payload.customer}", \n
                address: "${payload.address}", \n
            },
        }`);
}

start();
