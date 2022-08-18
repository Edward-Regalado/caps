'use strict';

const events = require('./events.js');

function pickUp(payload) {
    setTimeout(()  => {
        events.emit('pickUp', payload);
        logEvents(payload, 'pickup');
        console.log(`DRIVER picked up: ${payload.orderId}`);
    }, 1000);
    return payload;
}

function inTransit(payload) {
    setTimeout(() => {
        events.emit('in-transit', payload);
        logEvents(payload, 'in-transit');
        console.log(`DRIVER in-transit: ${payload.orderId}`);
    }, 2000)
    return payload;
}

function delivered(payload) {
    setTimeout(() => {
        events.emit('delivered', payload);
        logEvents(payload, 'delivered');
        console.log(`DRIVER delivered: ${payload.orderId}`);
    }, 3000);
    return payload;
}

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

module.exports = {
    pickUp,
    inTransit,
    delivered,
    logEvents, 
}
