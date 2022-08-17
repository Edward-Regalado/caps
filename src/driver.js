'use strict';

const events = require('./events.js');

// Listening for emit events
// Once we "hear" the keyword 'newOrder', fire off the pickUp function and start the domino event

events.addListener('newOrder', pickUp);
events.addListener('pickUp', inTransit);
events.addListener('in-transit', delivered);

function pickUp(payload) {
    setTimeout(() => {
        events.emit('pickUp', payload);
        console.log(`DRIVER picked up: ${payload.orderId}`);
    }, 1000);
}

function inTransit(payload) {
    setTimeout(() => {
        events.emit('in-transit', payload);
        console.log(`DRIVER in-transit: ${payload.orderId}`);
    }, 2000)
}

function delivered(payload) {
    setTimeout(() => {
        events.emit('delivered', payload);
        console.log(`DRIVER delivered: ${payload.orderId}`);
    }, 3000);
}

module.exports = {
    pickUp,
    inTransit,
    delivered 
}
