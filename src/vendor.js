'use strict';

const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');

const Chance = require('chance');
const chance = Chance();

// function newStore(store){
//         setInterval(() => {
//             let store = chance.company();
//             socket.emit('start', store);
//         }, 10000);
//     return store;
// };

function createPackage() {
        setInterval(() => {
            let order;

            order = {
                store: chance.company(),
                orderId: chance.string({length: 10}) + chance.string({length: 10}),
                customer: chance.name(),
                address: chance.city() + ', ' + chance.state(),
            }
           socket.emit('new-package', order);
            // let order;
    
            // if(newStore === 'Test Store'){
            //     order = {
            //         store: 'Target',
            //         orderId: 12345,
            //         customer: 'John Smith',
            //         address: 'Seattle, Washington',
            //     }
            // } else {
            //     order = {
            //         store: chance.company(),
            //         orderId: chance.string({length: 10}) + chance.string({length: 10}),
            //         customer: chance.name(),
            //         address: chance.city() + ', ' + chance.state(),
            //     }
            //    socket.emit('new-package', order);
            // }
        }, 10000);
        // return order;
}

function packageDelivered(payload) {
    socket.on('confirmation-delivery', (payload) => {
        setTimeout(() => {
            console.log(`Thank you, ${payload.customer}`);
        }, 3000);
    });
    // return `Thank you, ${payload.customer}`;
}

// newStore();
createPackage();
packageDelivered();

// module.exports = {
//     newStore,
//     createPackage,
//     packageDelivered,
// }
