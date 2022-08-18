'use strict';

// Main Hub Application
const Chance = require('chance');
const chance = Chance();
const events = require('./events.js');

const { createPackage, packageDelivered } = require('./vendor.js');
const { pickUp, inTransit, delivered } = require('./driver.js');

events.addListener('start', createPackage);
events.addListener('newOrder', pickUp);
events.addListener('pickUp', inTransit);
events.addListener('in-transit', delivered);
events.addListener('delivered', packageDelivered);

function start(){
    setInterval(() => {
        let store = chance.company();
        events.emit('start', store);
    }, 10000);
}

start();
