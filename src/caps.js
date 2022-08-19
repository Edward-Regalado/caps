'use strict';

// Main Hub Application
const Chance = require('chance');
const chance = Chance();
// const events = require('./events.js');

const socketIo = require('socket.io');
const  io = socketIo(3000);
// const socket = io('ws://localhost:3000');

const { createANewStore, createPackage, packageDelivered } = require('./vendor.js');
const { pickUp, inTransit, delivered } = require('./driver.js');

function start() {
    io.on('connection', (client) => {
        client.on('start', createPackage);
        client.on('newOrder', pickUp);
        client.on('pickUp', inTransit);
        client.on('in-transit', delivered);
        client.on('delivered', packageDelivered);
    });
};

start();
createANewStore();
