'use strict';

// const events = require('./events.js');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');

function pickUp(payload) {
    socket.on('new-package-for-delivery', (payload) => {
        setTimeout(() => {
            socket.emit('driver-picked-up', payload);
            console.log(`DRIVER picked up: ${payload.orderId}`);
        }, 1000);
    });
    // return payload;
}

function inTransit(payload) {
    socket.on('confirmation-pickUp', (payload) => {
        setTimeout(() => {
            socket.emit('driver-in-transit', payload);
            console.log(`DRIVER in-transit: ${payload.orderId}`);
        }, 2000)
    });
    // return payload;
}

function delivered(payload) {
    socket.on('confirmation-in-transit', (payload) => {
        setTimeout(() => {
            // listening for inTransit
            socket.emit('driver-delivered', payload);
            console.log(`DRIVER delivered: ${payload.orderId}`);
        }, 3000);
    });
    // return payload;
}

pickUp();
inTransit();
delivered();
