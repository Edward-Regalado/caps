'use strict';

// Global Event Pool (HUB)
// Instantiate a socketIo and export to all modules for use (driver, vendor, caps).

// const EventsEmitter = require('events');
// const events = new EventsEmitter();

const socketIo = require('socket.io');
const  io = socketIo(3000);

module.exports = io;
