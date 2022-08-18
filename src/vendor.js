'use strict';

const events = require('./events.js');
const Chance = require('chance');
const chance = Chance();

function createPackage(newStore) {
    let order;

    if(newStore === 'Test Store'){
        order = {
            store: 'Target',
            orderId: 12345,
            customer: 'John Smith',
            address: 'Seattle, Washington',
        }
    } else {
        order = {
            store: newStore,
            orderId: chance.string({length: 10}) + chance.string({length: 10}),
            customer: chance.name(),
            address: chance.city() + ', ' + chance.state(),
        }
    }
        events.emit('newOrder', order);
        return order;
}

function packageDelivered(payload) {
    setTimeout(() => {
        console.log(`Thank you, ${payload.customer}`);
    }, 3000);
    return `Thank you, ${payload.customer}`;
}

module.exports = {
    createPackage,
    packageDelivered,
}
