'use strict';

const events = require('./events.js');
const Chance = require('chance');
const chance = Chance();

events.addListener('start', createPackage);

function createPackage(newStore){
    
        let order = {
            store: newStore,
            orderId: chance.string({length: 10}) + chance.string({length: 10}),
            customer: chance.name(),
            address: chance.city() + ', ' + chance.state(),
        }
        events.emit('newOrder', order);
}

function packageDelivered(payload) {
    setTimeout(() => {
        console.log(`Thank you, ${payload.customer}`);
    }, 3000);
}

module.exports = {
    createPackage,
    packageDelivered,
}
