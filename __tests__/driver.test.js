'use strict';

const { pickUp, inTransit, delivered, logEvents } = require("../src/driver");
const { createPackage } = require("../src/vendor");
const events  = require('../src/events.js');

const payload = {
    store: 'Target',
    orderId: 12345,
    customer: 'John Smith',
    address: 'Seattle, Washington',
}

describe('driver system', () => {
    
    let consoleLog;
    let emit;

    beforeEach(() => {
        consoleLog = jest.spyOn(console, 'log');
        emit = jest.spyOn(events, 'emit');
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

    it('sends a pickup notification', () => {;
        pickUp(payload);     
        jest.runAllTimers();
        expect(consoleLog).toHaveBeenCalled();
        expect(emit).toHaveBeenCalled();             
        expect(payload.store).toBe('Target');     
    });

    it('sends a in-transit notification', () => {;
        inTransit(payload);
        jest.runAllTimers();
        expect(consoleLog).toHaveBeenCalled();
        expect(emit).toHaveBeenCalled();
        expect(payload.store).toBe('Target');           
    });

    it('sends a delivered notification', () => {;
        delivered(payload);
        jest.runAllTimers();
        expect(consoleLog).toHaveBeenCalled();
        expect(emit).toHaveBeenCalled();
        expect(payload.store).toBe('Target');           
    });
});
