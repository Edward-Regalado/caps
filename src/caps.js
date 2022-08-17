'use strict';

// Main Hub Application

const events = require('./events.js');
require('./vendor.js');
require('./driver.js');

// Fires off the createPackage function - this is the first domino event in my app
events.emit('ready');

events.addListener('pickUp', printPickUp);
events.addListener('in-transit', printInTransit);
events.addListener('delivered', printDelivered);

function printPickUp(payload) {
    const date = Date.now();
    // const today = new Date(date).toISOString();
    const today = new Date(date).toUTCString();
    console.log(`
        EVENT: {\n
            event: "pickup",\n
            time: "${today}",\n
            payload: {\n
                store: "${payload.store}", \n
                orderID: "${payload.orderID}", \n
                customer: "${payload.customer}", \n
                address: "${payload.address}", \n
            },
        }`);
}

function printInTransit(payload){
        const date = Date.now();
        const today = new Date(date).toISOString();
    console.log(`
        EVENT: {\n
            event: "in-transit",\n
            time: "${today}",\n
            payload: {\n
                store: "${payload.store}", \n
                orderID: "${payload.orderID}", \n
                customer: "${payload.customer}", \n
                address: "${payload.address}", \n
            },
        }`);
}

function printDelivered(payload){
        const date = Date.now();
        const today = new Date(date).toISOString();
    console.log(`
        EVENT: {\n
            event: "delivered",\n
            time: "${today}",\n
            payload: {\n
                store: "${payload.store}", \n
                orderID: "${payload.orderID}", \n
                customer: "${payload.customer}", \n
                address: "${payload.address}", \n
            },
        }`);
}
