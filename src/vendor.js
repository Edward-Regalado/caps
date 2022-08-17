'use strict';

const events = require('./events.js');
const Chance = require('chance');
const chance = Chance();

events.addListener('ready', createPackage);
events.addListener('delivered', delivered);

// Creating new pickups for drivers
// This will emit a new signal for the drivers called 'newOrder'
function createPackage(){
    setInterval(() => {

        let company = chance.company();
        let orderNumber = chance.integer({min: 0, max: 100000})
        let orderString = chance.string({length: 10})
        let name = chance.name();
        let city = chance.city();
        let state = chance.state();

        let order = {
            store: company,
            orderId: orderNumber + orderString,
            customer: name,
            address: city + ', ' + state,
        }

        console.log(`New Order: \n
        ${order.store}\n
        ${order.orderId}\n
        ${order.customer}\n
        ${order.address}\n`)
        events.emit('newOrder', order);
    }, 10000);
}

function delivered(payload) {
    setTimeout(() => {
        console.log(`Thank you, ${payload.customer}`);
    }, 1000);
}

module.exports = {
    createPackage,
    delivered,
}
