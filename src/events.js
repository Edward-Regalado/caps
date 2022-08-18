'use strict';

// Global Event Pool (HUB)
// Instantiate a new event and export so all modules that use it (driver, vendor, caps) can use it.

const EventsEmitter = require('events');
const events = new EventsEmitter();

module.exports = events;
